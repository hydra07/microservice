import { Router } from "express";
import RecipeController from "../controller/recipe.controller";

const router = Router();
const recipeController = new RecipeController();

router.get("/recipe/all", recipeController.getAll);
router
  .post("/recipe", recipeController.createRecipe)
  .get("/recipe", recipeController.getRecipe)
  .put("/recipe/:id", recipeController.updateRecipe);
router.get("/recipe/ingredients", recipeController.getIngredients);

export default router;
