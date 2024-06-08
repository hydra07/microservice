import { Expose, Transform, Type } from 'class-transformer';
import { CategoryProductDTO } from './categoryProduct';
import { ImgProductDTO } from './imgProduct.dto';
import { MeasurementDTO } from './measurement.dto';
import { NutritionDTO } from './nutrition.dto';

export class ProductDTO {
  @Expose()
  id?: number;

  @Expose()
  name?: string;

  @Expose()
  description?: string;

  @Expose()
  currentQuantity?: number;

  @Expose()
  price?: number;

  @Expose()
  @Type(() => ImgProductDTO)
  imgProducts?: ImgProductDTO[];

  @Expose()
  @Type(() => CategoryProductDTO)
  category!: CategoryProductDTO;

  @Expose()
  isActivated?: boolean;

  @Expose()
  amountToSell?: number;

  @Expose()
  averageWeight?: number;

  @Expose()
  @Type(() => MeasurementDTO)
  measurement!: MeasurementDTO;

  @Expose()
  @Type(() => NutritionDTO)
  nutrition?: NutritionDTO;
}