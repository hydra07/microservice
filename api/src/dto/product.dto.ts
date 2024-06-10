import { Expose, Transform, Type } from 'class-transformer';;
import { ImgProductDTO } from './imgProduct.dto';
import { CategoryProduct } from '../entity/categoryProduct.entity';
import { Measurement } from '@/entity/measurement.entity';
import { Nutrition } from '@/entity/nutrition.entity';

export class ProductDTO {
  @Expose()
  id?: number;

  @Expose()
  name!: string;

  @Expose()
  description?: string;

  @Expose()
  currentQuantity!: number;

  @Expose()
  price!: number;

  @Expose()
  @Type(() => ImgProductDTO)
  imgProducts?: ImgProductDTO[];

  @Expose()
  @Type(() => CategoryProduct)
  category!: CategoryProduct;

  @Expose()
  isActivated!: boolean;

  @Expose()
  amountToSell?: number;

  @Expose()
  averageWeight?: number;

  @Expose()
  @Type(() => Measurement)
  measurement!: Measurement;

  @Expose()
  @Type(() => Nutrition)
  nutrition?: Nutrition;
}