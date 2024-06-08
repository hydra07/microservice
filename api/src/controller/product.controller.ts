import { BaseController } from "./baseController";
import { Product } from "@/entity/product.entity";
import { ProductService } from "@/service/product.service";
import { Request, Response, NextFunction } from "express";
import { CategoryProduct } from "../entity/categoryProduct.entity";
import { CategoryProductService } from "@/service/categoryProduct.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { plainToClass } from "class-transformer";

export default class ProductController extends BaseController<Product> {
  constructor() {
    super(new ProductService());
  }

  async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    const productData = req.body;
    const newProduct = await this.service.save(productData);
    res.status(201).json(plainToClass(Product, newProduct));
  }
  


}
