import { Product } from "@/entity/product.entity";
import BaseService from "./baseService";
import { DeepPartial, FindOneOptions } from "typeorm";
import { Nutrition } from "../entity/nutrition.entity";
import { NutritionService } from "./nutrition.service";
import { ImgProduct } from "../entity/imgProduct.entity";
import { ImgProductService } from "./imgProduct.service";
import handleError from "../util/handleError";
import { ProductDTO } from "@/dto/product.dto";
import {
  classToPlain,
  instanceToPlain,
  plainToInstance,
} from "class-transformer";
import { stringify } from "flatted";
import { validate } from "class-validator";

export class ProductService extends BaseService<Product> {
  private nutritionService: NutritionService;
  private imgProductService: ImgProductService;

  constructor() {
    super(Product);
    this.nutritionService = new NutritionService();
    this.imgProductService = new ImgProductService();
  }

  async save(entity: DeepPartial<Product>): Promise<Product | undefined> {
    try {
      // Save nutrition
      if (entity.nutrition) {
        entity.nutrition = await this.nutritionService.save(entity.nutrition);
      }

      return super.save(entity);
    } catch (error) {
      return handleError(error as Error, "Error saving product");
    }
  }
  

  async saveDTO(dto: DeepPartial<ProductDTO>): Promise<Product | undefined> {
    try {
      //validate dto
      // const errors = await validate(dto);
      // if (errors.length > 0) {
      //   throw new Error(`Validation failed: ${errors.map(err => Object.values(err.constraints).join(', '))}`);
      // }
      console.log(dto, 'dto')
      const entity = plainToInstance(Product, dto, {
        // excludeExtraneousValues: true,
      });
      return super.save(entity);
    } catch (error) {
      return handleError(error as Error, "Error saving product");
    }
  }
  

  // add custom...
  // public update(options: FindOneOptions<Product>, data: Partial<Product>): Promise<Product | null> {
    
  // }
}
