// src/service/categoryProductService.ts
import { CategoryProduct } from "@/entity/categoryProduct.entity";
import BaseService from "./baseService";

export default class CategoryProductService extends BaseService<CategoryProduct> {
  constructor() {
    super(CategoryProduct);
  }

  // add custom...
}

