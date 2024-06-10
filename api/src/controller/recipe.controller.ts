import { BaseController } from "./baseController";
import { Recipe } from "@/entity/recipe.entity";
import { RecipeService } from "@/service/recipe.service";

export default class RecipeController extends BaseController<Recipe> {
    constructor() {
        super(new RecipeService());
    }
}