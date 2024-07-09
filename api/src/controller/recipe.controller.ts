import { NextFunction, Request, Response } from "express";
import RecipeService from "@/service/recipe.service.ts";

export default class RecipeController {
  private recipeService = new RecipeService();
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
      const skip = req.query.skip
        ? parseInt(req.query.skip as string)
        : undefined;
      const take = req.query.take
        ? parseInt(req.query.take as string)
        : undefined;

      const { recipes, total } = await this.recipeService.getRecipe(skip, take);
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
}
