import { Nutrition } from "@/entity/nutrition.entity";
import BaseService from "./baseService";
import { DeepPartial } from "typeorm";

export class NutritionService extends BaseService<Nutrition> {

  constructor() {
    super(Nutrition);
  }

  save(entity: DeepPartial<Nutrition>): Promise<Nutrition | undefined> {
    return super.save(entity);
  }
  
}