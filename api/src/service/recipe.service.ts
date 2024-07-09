import { MongoDataSource } from "@/config/db.config.ts";
import { Recipe } from "@/entity/recipe.entity.ts";
import UserService from "@/service/user.service";
import { Step } from "@/entity/recipeStep.entity.ts";
import { Ingredient } from "@/entity/ingredient.entity.ts";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { ObjectId } from "mongodb";

export default class RecipeService {
  private recipeRepository = MongoDataSource.getRepository(Recipe);
  private stepRepository = MongoDataSource.getRepository(Step);
  private ingredientRepository = MongoDataSource.getRepository(Ingredient);
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
  async getRecipe(skip?: number, take?: number): Promise<any> {
    const query: any = {};
    const options: any = {
      order: {
        createdAt: "DESC",
      },
    };
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
        existingIngredient.unit = _ingredient.unit;
        existingIngredient.quantity = _ingredient.quantity;
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
}
