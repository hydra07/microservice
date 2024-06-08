import { ImgProduct } from "@/entity/imgProduct.entity";
import BaseService from "./baseService";
import { DeepPartial } from "typeorm";

export class ImgProductService extends BaseService<ImgProduct> {

  constructor() {
    super(ImgProduct);
  }

  save(entity: DeepPartial<ImgProduct>): Promise<ImgProduct | undefined> {
    return super.save(entity);
  }
  
}