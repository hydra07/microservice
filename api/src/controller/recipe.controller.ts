import { NextFunction, Request, Response } from "express";
import RecipeService from "@/service/recipe.service.ts";
import { CreateRecipeDTO } from "@/dto/create-recipe.dto";
import { parseIngredients, parseSteps } from "@/util/recipe.util";
import { uploadToCloudinary } from "@/util/cloudinary.util";
import env from "@/util/validateEnv";

export default class RecipeController {
  private recipeService = new RecipeService();
  createNewRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as Record<string, string>;
      const files = req.files as Express.Multer.File[];

      const ingredients = parseIngredients(body);
      const steps = parseSteps(body);

      const mainImageFiles = files.filter((f) => f.fieldname === "image");
      const mainImageUrls = await Promise.all(
        mainImageFiles.map((file) =>
          uploadToCloudinary(file, env.CLOUD_IMG_FOLDER_RECIPE),
        ),
      );

      const stepImageUploadPromises = files
        .filter((file) => file.fieldname.startsWith("steps["))
        .map(async (file) => {
          const match = file.fieldname.match(/steps\[(\d+)\]/);
          if (match) {
            const [, stepIndex] = match;
            const i = parseInt(stepIndex);
            const imageUrl = await uploadToCloudinary(
              file,
              env.CLOUD_IMG_FOLDER_RECIPE,
            );
            if (steps[i]) {
              steps[i].images.push(imageUrl);
            }
          }
        });

      await Promise.all(stepImageUploadPromises);

      const recipe: CreateRecipeDTO = {
        userId: body.userId,
        title: body.title,
        description: body.description,
        cook_time: parseInt(body.cookTime),
        serving: parseInt(body.servings),
        difficulty: body.difficulty,
        images: mainImageUrls,
        ingredients,
        steps,
        isPublic: false,
        createdAt: new Date(),
      };
      console.log("data", recipe);
      console.log("data", body.servings);

      const newRecipe = await this.recipeService.createRecipe(recipe);
      res.status(200).json(newRecipe);
    } catch (error) {
      next(error);
    }
  };
  createRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.recipeService.createRecipe(req.body);
      res.status(201).json({
        message: "Recipe created successfully",
        recipe: recipe,
      });
    } catch (error) {
      next(error);
    }
  };
  updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.recipeService.updateRecipe(
        req.body,
        req.params.id,
      );
      res.status(201).json({
        message: "Recipe updated successfully",
        recipe: recipe,
      });
    } catch (error) {
      next(error);
    }
  };

  getRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
      const take = req.query.take ? parseInt(req.query.take as string) : undefined;
      const isPublic = req.query.isPublic ? req.query.isPublic === 'true' : undefined;
      const { recipes, total } = await this.recipeService.getRecipe(skip, take , isPublic);
      

      res.status(200).json({
        message: "Recipes fetched successfully",
        recipes,
        total,

      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipes = await this.recipeService.getAll();
      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  };

  getIngredients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ingredients = await this.recipeService.getIngredients();
      res.status(200).json(ingredients);
    } catch (error) {
      next(error);
    }
  };

  getAllTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await this.recipeService.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      next(error);
    }
  };

  getAllTagsName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await this.recipeService.getAllTags();
      const tagNames = tags.map((tag) => tag.name);
      res.status(200).json(tagNames);
    } catch (error) {
      next(error);
    }
  };

  createRecipeTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body; // Extract name from req.body
      const tag = await this.recipeService.saveNewRecipeTag(name);
      res.status(201).json({
        message: "Tag created successfully",
        tag: tag,
      });
    } catch (error) {
      next(error);
    }
  };

  addTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.recipeId;
      const tags = req.body.tags;
      console.log("tags", tags);
      console.log("recipeId", recipeId);
      const savedTags = await Promise.all(
        tags.map(async (tag: string) => {
          return await this.recipeService.saveNewRecipeTag(tag);
        }),
      );
      const post = await this.recipeService.addTagToRecipe(recipeId, tags);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  acceptRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.id;
      const recipe = await this.recipeService.updateStatusRecipe(
        recipeId,
        true,
      );
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  };

  rejectRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.id;
      const feedback = req.body.feedback;
      const recipe = await this.recipeService.updateStatusRecipe(
        recipeId,
        false,
        feedback,
      );
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  };

  updateRecipeIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const recipeId = req.params.id;
      const ingredients = req.body.ingredients;


      console.log(ingredients, 'ingredient');
      const updatedRecipe = await this.recipeService.updateIngredientProductIds(recipeId, ingredients);


      res.status(200).json({
        message: "Recipe ingredients updated successfully",
        recipe: updatedRecipe,
      });
    } catch (error) {
      next(error);
    }
  };

  getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.id;
      const recipe = await this.recipeService.getRecipeById(recipeId);
      console.log("recipe", recipe);
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.id;
      const content = req.body.content;
      const userId = req.body.userId;
      console.log("userid", userId);
      const recipe = await this.recipeService.addComment(
        recipeId,
        userId,
        content,
      );
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  };

  reaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.id;
      const userId = req.body.userId;
      const isLike = req.body.isLike as boolean;
      const isHeart = req.body.isHeart as boolean;
      const isCookpot = req.body.isCookpot as boolean;
      const recipe = await this.recipeService.reaction(
        recipeId,
        userId,
        isLike,
        isHeart,
        isCookpot,
      );
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }

  };
  getReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipeId = req.params.id;
      const userId = req.query.userId as string;
      console.log(userId);
      const reaction = await this.recipeService.getReaction(recipeId, userId);
      res.status(200).json(reaction);
    } catch (error) {
      next(error);
    }
  };

  

  searchRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.query as string;
      const tags: string[] = []; 
      const ingredients: string[] = Array.isArray(req.query.ingredients) 
        ? req.query.ingredients as string[]
        : req.query.ingredients 
        ? [req.query.ingredients as string] 
        : [];
      const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const recipes = await this.recipeService.searchRecipes(query, tags, ingredients, skip, limit);
      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  }
}

