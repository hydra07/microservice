import express from "express";
import multer from "multer";
import RecipeController from "@/controller/recipe.controller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const recipeController = new RecipeController();

router.get("/recipe/all", recipeController.getAll);
router.post("/recipe/:id/accept", recipeController.acceptRecipe);
router.post("/recipe/:id/reject", recipeController.rejectRecipe);

router.put("/recipe/:id/ingredients", recipeController.updateRecipeIngredients);

router
  .post("/recipe", upload.any(), recipeController.createNewRecipe)
  .get("/recipe", recipeController.getRecipe);

router
  .get("/recipe/:id", recipeController.getRecipeById)
  .put("/recipe/:id", recipeController.updateRecipe);

router.post("/recipe/:id/comments", recipeController.addComment);
router
  .post("/recipe/:id/reactions", recipeController.reaction)
  .get("/recipe/:id/reactions", recipeController.getReaction);

router.get("/recipe/tag", recipeController.getAllTagsName);
router.post("/recipe/tag", recipeController.createRecipeTag);
router.post("/recipe/tag/:recipeId", recipeController.addTags);

router.get("/recipe/ingredients", recipeController.getIngredients);
export default router;
