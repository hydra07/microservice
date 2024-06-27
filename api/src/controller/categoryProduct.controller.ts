
import { BaseController } from "./baseController";
import { CategoryProduct } from "@/entity/categoryProduct.entity";
import  CategoryProductService  from "@/service/categoryProduct.service";




export default class CategoryProductController extends BaseController<CategoryProduct> {
    constructor() {
      super(new CategoryProductService());
    }
}