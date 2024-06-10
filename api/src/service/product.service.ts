import { Product } from "@/entity/product.entity";
import BaseService from "./baseService";

export class ProductService extends BaseService<Product> {
  constructor() {
    super(Product);
  }

  // add custom...
}