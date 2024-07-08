import { BaseController } from "./baseController";
import { Product } from "@/entity/product.entity";
import  ProductService  from "@/service/product.service";
import { Request, Response, NextFunction } from "express";
import { CategoryProduct } from "../entity/categoryProduct.entity";
import  CategoryProductService from "@/service/categoryProduct.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { plainToClass, plainToInstance } from "class-transformer";
import { ProductDTO } from "@/dto/product-related.dto";
import { DeepPartial } from "typeorm";
import { validateOrReject } from "class-validator";

type QueryParams = {
  page?: string;
  limit?: string;
  keyword?: string;
  fieldName?: keyof Product;
  category?: string;
  order?: 'ASC' | 'DESC';
  orderBy?: keyof Product;
};


export default class ProductController extends BaseController<Product> {
  private productService: ProductService;

  constructor() {
    const service = new ProductService();
    super(service);
    this.productService = service;
  }

 async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productData = plainToClass(ProductDTO, req.body);
      await validateOrReject(productData);
      const newProduct = await this.service.save(productData);
      res.status(201).json(plainToClass(Product, newProduct));
    } catch (error) {
      next(error);
    }
  }

  async getAllDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await this.service.getAll();
      const productsDTO = products.map((product) =>
        plainToClass(ProductDTO, product)
      );
      res.status(200).json(productsDTO);
    } catch (error) {
      next(error);
    }
  }

  async createDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productDTO = req.body;
      const newProduct = await this.productService.saveDTO(productDTO);
      res.status(201).json(plainToClass(Product, newProduct));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const productData = req.body;

      const product = await this.service.getSingle({ where: { id: id } });
      if (product) {
        const updatedProduct = await this.service.update(
          { where: { id: id } },
          plainToInstance(Product, productData)
        );
        if (updatedProduct) {
          res.status(200).json(plainToClass(Product, updatedProduct));
        }
        next({ status: 404, message: "Product not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByCategoryId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // Corrected query options to use the relationship property name
      const options = { where: { category: { id: id } } };
      const products = await this.productService.findAll(options as any);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // controller.ts
async getProducts(req: Request, res: Response, next: NextFunction) {
  const {
    page = '1',
    limit = '10',
    keyword = '',
    fieldName,
    category = '',
    order = 'ASC',
    orderBy,
  }: QueryParams = req.query;

  try {
    const categoryIds = category.split(',').map(Number).filter(Boolean);

    const result = await this.productService.getProducts(
      parseInt(page, 10),
      parseInt(limit, 10),
      keyword,
      fieldName,
      categoryIds.length > 0 ? categoryIds : undefined,
      order,
      orderBy,
      true //instock ,get all product have currentQuantity > 0
    );

    res.json(result);
  } catch (error) {
    console.error('Error getting products:', error);
    next(error);
  }
}

  
  
}
