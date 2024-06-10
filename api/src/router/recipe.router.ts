import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "@/util/validateRequest";
import RecipeController from '../controller/recipe.controller';
import { Recipe } from '../entity/recipe.entity';

const recipeRouter = Router();
const recipeController = new RecipeController();

// Routes
recipeRouter.get("/recipes", recipeController.getAll.bind(recipeController));
recipeRouter.get("/recipes/search", validateRequest, recipeController.findAndPaginate.bind(recipeController));
recipeRouter.get("/recipes/:id", recipeController.getSingle.bind(recipeController));

recipeRouter.post("/recipes", validateRequest, recipeController.create.bind(recipeController));
recipeRouter.put("/recipes/:id", validateRequest, recipeController.update.bind(recipeController));
recipeRouter.delete("/recipes/:id", recipeController.delete.bind(recipeController));

export default recipeRouter;
