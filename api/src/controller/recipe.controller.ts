import { BaseController } from "./baseController";
import { Recipe } from "@/entity/recipe.entity";
import { RecipeService } from "@/service/recipe.service";
import { NextFunction } from "express";

export default class RecipeController extends BaseController<Recipe> {
    constructor(service: RecipeService) {
        super(service);
    }

}
