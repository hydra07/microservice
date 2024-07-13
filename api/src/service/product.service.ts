import { Product } from "@/entity/product.entity";
import BaseService from "./baseService";
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOperatorType,
  ILike,
  In,
  MoreThan,
} from "typeorm";
import { Nutrition } from "../entity/nutrition.entity";
import { NutritionService } from "./nutrition.service";
import { ProductDTO } from "@/dto/product-related.dto";
import { ImgProduct } from "../entity/imgProduct.entity";
import { ImgProductService } from "./imgProduct.service";
import handleError from "../util/handleError";
import {
  classToPlain,
  instanceToPlain,
  plainToInstance,
} from "class-transformer";
import { stringify } from "flatted";
import { validate } from "class-validator";
import { FindOperator, getManager } from "typeorm";
import { totalmem } from "os";
import { PaginatedResult } from "@/@types/user";
import { PostgresDataSource } from "@/config/db.config";

export default class ProductService extends BaseService<Product> {
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

  async getMultiple(options: FindManyOptions<Product>): Promise<Product[]> {
    try {
      return await this.repository.find(options);
    } catch (error) {
      throw new Error(`Error fetching multiple products: ${error}`);
    }
  }

  async saveDTO(dto: DeepPartial<ProductDTO>): Promise<Product | undefined> {
    try {
      //validate dto
      // const errors = await validate(dto);
      // if (errors.length > 0) {
      //   throw new Error(`Validation failed: ${errors.map(err => Object.values(err.constraints).join(', '))}`);
      // }
      console.log(dto, "dto");
      const entity = plainToInstance(Product, dto, {
        // excludeExtraneousValues: true,
      });
      return super.save(entity);
    } catch (error) {
      return handleError(error as Error, "Error saving product");
    }
  }
  // add custom...

  // product.service.ts
  async getProducts(
    page: number,
    limit: number,
    keyword: string,
    fieldName: keyof Product | undefined,
    categories: number[] | undefined,
    order: "ASC" | "DESC",
    orderBy: keyof Product | undefined,
    inStock: boolean
  ): Promise<PaginatedResult<Product>> {
    try {
      const skip = (page - 1) * limit;
      const where: Record<string, any> = {};

      if (fieldName) {
        where[fieldName] = ILike(`%${keyword}%`);
      }

      if (categories && categories.length > 0) {
        where.category = { id: In(categories) };
      }

      if (inStock) {
        where.currentQuantity = MoreThan(0);
      }

      console.log(where, "where");
      const [result, total] = await this.repository.findAndCount({
        where,
        order: {
          ...(orderBy && order ? { [orderBy]: order } : {}),
        },
        take: limit,
        skip,
      });

      return {
        data: result,
        total,
        limit,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Error finding and paginating entities: ${error}`);
    }
  }
  async getBestSellingProducts(): Promise<{ name: string; sales: number }[]> {

    const bestSellingProducts = await PostgresDataSource.query(`
      SELECT 
        p.name, 
        SUM(oi.quantity) as sales
      FROM 
        order_items oi
      INNER JOIN 
        products p ON oi.product_id = p.id
      GROUP BY 
        p.id
      ORDER BY 
        sales DESC
      LIMIT 5;
    `);
   

    // // Sort by sales in descending order and limit to top 5
    // const bestSellingProducts = [
    //   { name: "Product 1", sales: 100 },
    //   { name: "Product 2", sales: 90 },
    //   { name: "Product 3", sales: 80 },
    //   { name: "Product 4", sales: 70 },
    //   { name: "Product 5", sales: 60 },
    // ]

    return bestSellingProducts;
}

}
