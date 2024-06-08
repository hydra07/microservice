import { Product } from "@/entity/product.entity";
import BaseService from "./baseService";
import { DeepPartial, FindOneOptions } from "typeorm";
import { Nutrition } from "../entity/nutrition.entity";
import { NutritionService } from "./nutrition.service";
import { ImgProduct } from "../entity/imgProduct.entity";
import { ImgProductService } from "./imgProduct.service";
import handleError from '../util/handleError';
import { ProductDTO } from "@/dto/product.dto";
import { classToPlain, instanceToPlain } from "class-transformer";
import { stringify } from 'flatted';

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

  async getProductDTO(option: FindOneOptions<Product>): Promise<ProductDTO | null> {
    const product = await this.repository.findOne(option);
    if (!product) {
      return null;
    }
    return instanceToPlain(product) as ProductDTO;
  }

  // add custom...
}