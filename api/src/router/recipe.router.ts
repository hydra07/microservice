// import { NextFunction, Request, Response, Router } from "express";
// import validateRequest from "@/util/validateRequest";
// import RecipeController from '../controller/recipe.controller';
// import { Recipe } from '../entity/recipe.entity';

// const recipeRouter = Router();
// const recipeController = new RecipeController();

// // Routes
// recipeRouter.get("/recipes", recipeController.getAll.bind(recipeController));
// recipeRouter.get("/recipes/search", validateRequest, recipeController.findAndPaginate.bind(recipeController));
// recipeRouter.get("/recipes/:id", recipeController.getSingle.bind(recipeController));

// recipeRouter.post("/recipes", validateRequest, recipeController.create.bind(recipeController));
// recipeRouter.put("/recipes/:id", validateRequest, recipeController.update.bind(recipeController));
// recipeRouter.delete("/recipes/:id", recipeController.delete.bind(recipeController));

// export default recipeRouter;
import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '@/util/validateRequest';
import RecipeController from '../controller/recipe.controller';
import { Recipe } from '../entity/recipe.entity';

const recipeRouter = Router();
const recipeController = new RecipeController();

// Routes
recipeRouter.get('/recipes', (req: Request, res: Response, next: NextFunction) => {
    recipeController.getAll(req, res, next);
});

recipeRouter.get('/recipes/search', validateRequest, (req: Request, res: Response, next: NextFunction) => {
    recipeController.findAndPaginate(req, res, next);
});

recipeRouter.get('/recipes/:id', (req: Request, res: Response, next: NextFunction) => {
    recipeController.getSingle(req, res, next);
});

recipeRouter.post('/recipes', validateRequest, (req: Request, res: Response, next: NextFunction) => {
    recipeController.create(req, res, next);
});

recipeRouter.put('/recipes/:id', validateRequest, (req: Request, res: Response, next: NextFunction) => {
    recipeController.update(req, res, next);
});

recipeRouter.delete('/recipes/:id', (req: Request, res: Response, next: NextFunction) => {
    recipeController.delete(req, res, next);
});

export default recipeRouter;
