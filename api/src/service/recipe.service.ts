  import { MongoDataSource } from "@/config/db.config.ts";
  import { Recipe, RecipeTag } from "@/entity/recipe.entity.ts";
  import UserService from "@/service/user.service";
  import { Step } from "@/entity/recipeStep.entity.ts";
  import { Ingredient } from "@/entity/ingredient.entity.ts";
  import { plainToInstance } from "class-transformer";
  import { validateOrReject } from "class-validator";
  import { ObjectId } from "mongodb";
  import { notificationService } from "@/config/socket.config";

  import env from "@/util/validateEnv";

  export default class RecipeService {
    private recipeRepository = MongoDataSource.getRepository(Recipe);
    private stepRepository = MongoDataSource.getRepository(Step);
    private ingredientRepository = MongoDataSource.getRepository(Ingredient);
    private recipeTagRepository = MongoDataSource.getRepository(RecipeTag);
    private UserService = new UserService();

    async mapAndValidateRecipe(json: any): Promise<Recipe> {
      const recipe = plainToInstance(Recipe, json);
      json.createdAt && (recipe.createdAt = new Date(json.createdAt));
      json.updatedAt && (recipe.updatedAt = new Date(json.updatedAt));
      //not validate steps and ingredients
      recipe.steps = [];
      recipe.ingredients = [];
      await validateOrReject(recipe);
      return recipe;
    }
    /**
     * Get all recipes
     * */
    async getAll(): Promise<Recipe[]> {
      return await this.recipeRepository.find({
        order: {
          createdAt: "DESC",
        },
      });
    }

    /**
     * Get public recipes
     */
    async getRecipe(skip?: number, take?: number, isPublic?: boolean): Promise<any> {
      const query: any = {};
      const options: any = {
        order: {
          createdAt: "DESC",
        },
      };
      isPublic && (query.isPublic = isPublic);
      skip && (options.skip = skip);
      take && (options.take = take);
      // query.isActivate = true;
      const [recipes, total] = await this.recipeRepository.findAndCount({
        where: query,
        ...options,
      });
      const recipeDetails = await Promise.all(
        recipes.map(async (recipe: Recipe) => {
          const steps = await this.stepRepository.find({
            where: {
              _id: { $in: recipe.steps },
            },
          } as any);
          const ingredients = await this.ingredientRepository.find({
            where: {
              _id: { $in: recipe.ingredients },
            },
          } as any);
          const _user = await this.UserService.findUserById(recipe.userId!);
          const user = _user
            ? {
              id: _user.id,
              name: _user.username,
              avatar: _user.avatar,
            }
            : {
              id: undefined,
              name: undefined,
              avatar: undefined,
            };
          return {
            ...recipe,
            steps,
            ingredients,
            user,
          };
        }),
      );
      return { recipes: recipeDetails, total };
    }
    /*
    * This function creates or updates ingredients in recipe
    * */
    async createOrUpdateIngredient(ingredients: any[]): Promise<ObjectId[]> {
      const ingredientIds: ObjectId[] = [];
      for (const ingredient of ingredients) {
        const _ingredient = plainToInstance(Ingredient, ingredient);
        await validateOrReject(_ingredient);

        let existingIngredient = await this.ingredientRepository.findOne({
          where: {
            _id: _ingredient._id,
          },
        });
        if (!existingIngredient) {
          existingIngredient = this.ingredientRepository.create(_ingredient);
          await this.ingredientRepository.save(existingIngredient);
        } else {
          existingIngredient.name = _ingredient.name;
          // existingIngredient.unit = _ingredient.unit;
          existingIngredient.quantity = _ingredient.quantity;
          existingIngredient.productId = _ingredient.productId;
          await this.ingredientRepository.update(
            new ObjectId(existingIngredient._id),
            existingIngredient,
          );
        }
        try {
          ingredientIds.push(existingIngredient._id);
        } catch (error: any) {
          console.error(
            `Error saving ingredient with _id ${_ingredient._id}:`,
            error.message,
          );
          throw new Error(`Failed to save step with _id ${_ingredient._id}`);
        }
        // await this.ingredientRepository.save(existingIngredient);
        // ingredientIds.push(existingIngredient._id);
      }
      return ingredientIds;
    }
    /*
    * This function creates or updates steps in recipe
    * */
    async createOrUpdateStep(steps: any[]): Promise<ObjectId[]> {
      const stepIds: ObjectId[] = [];
      for (const step of steps) {
        const _step = plainToInstance(Step, step);
        await validateOrReject(_step);

        let existingStep = await this.stepRepository.findOne({
          where: {
            _id: _step._id,
          },
        });
        if (!existingStep) {
          existingStep = this.stepRepository.create(_step);
          await this.stepRepository.save(existingStep);
        } else {
          existingStep.description = _step.description;
          existingStep.images = _step.images;
          await this.stepRepository.update(
            new ObjectId(existingStep._id),
            existingStep,
          );
        }
        try {
          stepIds.push(existingStep._id);
        } catch (error: any) {
          console.error(
            `Error saving step with _id ${_step._id}:`,
            error.message,
          );
          throw new Error(`Failed to save step with _id ${_step._id}`);
        }
      }
      return stepIds;
    }
    /*
    * This function creates or updates a recipe
    * */
    async createRecipe(json: any): Promise<Recipe> {
      const recipe = await this.mapAndValidateRecipe(json);
      recipe.steps = await this.createOrUpdateStep(json.steps);
      recipe.ingredients = await this.createOrUpdateIngredient(json.ingredients);
      recipe.updatedAt = new Date();
      return await this.recipeRepository.save(recipe);
    }

    /*
    * This function updates a recipe
    * */
    async updateRecipe(json: any, id: string): Promise<[Recipe | null, string]> {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
      }
      const recipe = await this.recipeRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      if (!recipe) {
        return [null, "Recipe not found"];
      }

      // @ts-ignore
      try {
        const updatedRecipe = await this.mapAndValidateRecipe(json);
        updatedRecipe.steps = await this.createOrUpdateStep(json.steps);
        updatedRecipe.ingredients = await this.createOrUpdateIngredient(
          json.ingredients,
        );

        Object.assign(recipe, {
          title: updatedRecipe.title,
          steps: Array.from(new Set(updatedRecipe.steps)),
          ingredients: Array.from(new Set(updatedRecipe.ingredients)),
          cook_time: updatedRecipe.cook_time,
          serving: updatedRecipe.serving,
          images: updatedRecipe.images,
          updatedAt: new Date(),
        });

        await this.recipeRepository.update(new ObjectId(recipe._id), recipe);
      } catch (error: any) {
        console.error("Error updating recipe:", error.message);
        throw new Error("Failed to update recipe");
      }
      return [recipe, id];
    }

    /*
    * Get existing ingredients
    * */
    async getIngredients(): Promise<Ingredient[]> {
      return await this.ingredientRepository.find();
    }

    async getAllTags(): Promise<RecipeTag[]> {
      return await this.recipeTagRepository.find();
    }
    
    async addTagToRecipe(id: string, tags: string[]) {
      try {
        const objectId = new ObjectId(id);
        
        // First, update the recipe
        await this.recipeRepository.update(
          { _id: objectId },
          { tags: tags.map(tag => ({ name: tag })) }
        );
    
        // Then, fetch the updated recipe
        const updatedRecipe = await this.recipeRepository.findOne({
          where: { _id: objectId }
        });
    
        if (!updatedRecipe) {
          throw new Error('Recipe not found');
        }
    
        return updatedRecipe;
      } catch (error) {
        console.error("Error adding tags to recipe:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to add tags to recipe: ${error.message}`);
        } else {
          throw new Error("Failed to add tags to recipe: An unknown error occurred");
        }
      }
    }

    async saveNewRecipeTag(name: string): Promise<RecipeTag> {
      try {
        // Check if the tag already exists
        let existingTag = await this.recipeTagRepository.findOne({ where: { name } });
        if (existingTag) {
          return existingTag;
        }
    
        // Create a new tag if it doesn't exist
        const newTag = new RecipeTag();
        newTag._id = new ObjectId();
        newTag.name = name;
    
        await validateOrReject(newTag);
        const createdTag = await this.recipeTagRepository.save(newTag);
        return createdTag;
      } catch (error) {
        console.error("Error saving new recipe tag:", error);
        throw new Error("Failed to save new recipe tag");
      }
    }

    async updateStatusRecipe(id: string, active: boolean, feedback?: string): Promise<Recipe> {
      try {
        const objectId = new ObjectId(id);
        const recipe = await this.recipeRepository.findOne({ where: { _id: objectId } });
    
        if (!recipe) {
          throw new Error('Recipe not found');
        }
    
        recipe.isActivate = active;
        await this.recipeRepository.update({ _id: objectId }, recipe);      
        const updatedRecipe = await this.getRecipeById(id);

        if(!active) {
          await notificationService.createNotification({
            userId: recipe.userId!,
            title: "Recipe Rejected",
            content:  `Reason: ${feedback}`,
            createdAt: new Date() ,
          });

        }else{
          await notificationService.createNotification({
            userId: recipe.userId!,
            title: "Recipe Accepted",
            content: "Your recipe was public",
            createdAt: new Date() ,
          });

        }

        return updatedRecipe;
      } catch (error) {
        console.error("Error accepting recipe:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to accept recipe: ${error.message}`);
        } else {
          throw new Error("Failed to accept recipe: An unknown error occurred");
        }
      }
    }
    
    async getRecipeById(id: string): Promise<any> {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
      }
      const recipe = await this.recipeRepository.findOne({
        where: { _id: new ObjectId(id) },
      });

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      const steps = await this.stepRepository.find({
        where: {
          _id: { $in: recipe.steps },
        },
      } as any);

      const ingredients = await this.ingredientRepository.find({
        where: {
          _id: { $in: recipe.ingredients },
        },
      } as any);

      const _user = await this.UserService.findUserById(recipe.userId!);
      const user = _user
        ? {
            id: _user.id,
            name: _user.username,
            avatar: _user.avatar,
          }
        : {
            id: undefined,
            name: undefined,
            avatar: undefined,
          };

      return {
        ...recipe,
        steps,
        ingredients,
        user,
      };
    }

    async updateRecipeIngredients(recipeId: string, ingredients: any[]): Promise<Recipe> {
      if (!ObjectId.isValid(recipeId)) {
        throw new Error("Invalid recipe ID");
      }

      const recipe = await this.recipeRepository.findOne({
        where: { _id: new ObjectId(recipeId) },
      });

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      const ingredientIds = await this.createOrUpdateIngredient(ingredients);
      recipe.ingredients = ingredientIds;
      recipe.updatedAt = new Date();

      await this.recipeRepository.update(
        { _id: new ObjectId(recipeId) },
        recipe
      );

      return this.getRecipeById(recipeId);
    }
    async updateIngredientProductIds(recipeId: string, ingredients: { _id: string, productId: number }[]): Promise<Recipe> {
      if (!ObjectId.isValid(recipeId)) {
        throw new Error("Invalid recipe ID");
      }

      const recipe = await this.recipeRepository.findOne({
        where: { _id: new ObjectId(recipeId) },
      });

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      for (const ingredient of ingredients) {
        await this.ingredientRepository.update(
          { _id: new ObjectId(ingredient._id) },
          { productId: ingredient.productId } 
        );
      }

      recipe.updatedAt = new Date();

      await this.recipeRepository.update(
        { _id: new ObjectId(recipeId) },
        recipe
      );

      return this.getRecipeById(recipeId);
    }


    async searchRecipes(query: string, tags: string[], ingredients: string[], skip?: number, take?: number): Promise<any> {
      const searchQuery: any = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ]
      };
    
      if (tags && tags.length > 0) {
        searchQuery['tags.name'] = { $in: tags };
      }


      const optionsIngredients = {
        where: { name: { $in: ingredients } }
      } as any;


    
      if (ingredients && ingredients.length > 0) {
        const ingredientIds = await this.ingredientRepository.find({
          ...optionsIngredients,
          select: ['_id']
        });
        searchQuery.ingredients = { $in: ingredientIds.map(ing => ing._id) };
      }
    
      const options: any = {
        order: {
          createdAt: "DESC",
        },
        where: searchQuery
      };
    
      skip && (options.skip = skip);
      take && (options.take = take);
    
      const [recipes, total] = await this.recipeRepository.findAndCount(options);
    
      const recipeDetails = await Promise.all(
        recipes.map(async (recipe: Recipe) => {
          const steps = await this.stepRepository.find({
            where: {
              _id: { $in: recipe.steps },
            },
          } as any);
          const ingredients = await this.ingredientRepository.find({
            where: {
              _id: { $in: recipe.ingredients },
            },
          } as any);
          const _user = await this.UserService.findUserById(recipe.userId!);
          const user = _user
            ? {
              id: _user.id,
              name: _user.username,
              avatar: _user.avatar,
            }
            : {
              id: undefined,
              name: undefined,
              avatar: undefined,
            };
          return {
            ...recipe,
            steps,
            ingredients,
            user,
          };
        }),
      );
    
      return { recipes: recipeDetails, total };
    }
    

  }




