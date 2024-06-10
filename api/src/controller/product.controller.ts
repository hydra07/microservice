import { BaseController } from "./baseController";
import { Product } from "@/entity/product.entity";
import { ProductService } from "@/service/product.service";

export default class ProductController extends BaseController<Product> {
  constructor() {
    super(new ProductService());
  }
}
