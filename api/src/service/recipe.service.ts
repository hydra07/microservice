import { Recipe } from "@/entity/recipe.entity";
import BaseService from "./baseService";

export class RecipeService extends BaseService<Recipe>{
    constructor(){
        super(Recipe);
    }

}