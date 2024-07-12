import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import RecipeController from "@/controller/recipe.controller";


const router = express.Router();
const upload = multer({ dest: "uploads/" });
const recipeController = new RecipeController();


router.get("/recipe/all", recipeController.getAll);
router.post("/recipe/:id/accept", recipeController.acceptRecipe );
router.post("/recipe/:id/reject", recipeController.rejectRecipe );


router
  .post("/recipe", upload.any(), recipeController.createNewRecipe)
  .get("/recipe", recipeController.getRecipe)
  .put("/recipe/:id", recipeController.updateRecipe);

router.get("/recipe/tag", recipeController.getAllTagsName);
router.post("/recipe/tag", recipeController.createRecipeTag);
router.post("/recipe/tag/:recipeId", recipeController.addTags);



router.get("/recipe/ingredients", recipeController.getIngredients);   
export default router;