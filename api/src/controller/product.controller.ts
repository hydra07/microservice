
import { BaseController } from "./baseController";
import { Product } from "@/entity/product.entity";
import { ProductService } from "@/service/product.service";
import { Request, Response, NextFunction } from "express";
import { CategoryProduct } from "../entity/categoryProduct.entity";
import { CategoryProductService } from "@/service/categoryProduct.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { plainToClass } from "class-transformer";
import { ProductDTO } from "@/dto/product.dto";
import { DeepPartial } from "typeorm";


export default class ProductController extends BaseController<Product> {
  private productService: ProductService;

  constructor() {
    const service = new ProductService();
    super(service);
    this.productService = service;
  }

  async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    try {
      const productData = req.body;
      const newProduct = await this.service.save(productData);
      res.status(201).json(plainToClass(Product, newProduct));
    } catch (error) {
      next(error);
    }
  }


  async getAllDTO(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const products = await this.service.getAll();
      const productsDTO = products.map((product) => plainToClass(ProductDTO, product));
      console.log(productsDTO, 'get all')
      res.status(200).json(productsDTO);

    } catch (error) {
      next(error);
    }
  }

  async createDTO(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productDTO = req.body;
      const newProduct = await this.productService.saveDTO(productDTO);
      res.status(201).json(plainToClass(Product, newProduct));
    } catch (error) {
      next(error);
    }
  }

}
