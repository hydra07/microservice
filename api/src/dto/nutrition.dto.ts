import { Expose } from "class-transformer";

export class NutritionDTO {
    @Expose()
    id!: number;
    @Expose()
    calories!: number;
    @Expose()
    sugar!: number;
    @Expose()
    fat!: number;
    @Expose()
    sodium!: number;
    @Expose()
    carbs!: number;
    @Expose()
    fiber!: number;
  }