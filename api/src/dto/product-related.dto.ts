import { Expose, Transform, Type } from 'class-transformer';;
import { CategoryProduct } from '../entity/categoryProduct.entity';
import { Measurement } from '@/entity/measurement.entity';
import { Nutrition } from '@/entity/nutrition.entity';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryProductDTO {
    @Expose()
    id!: number;

    @Expose()
    name?: string;
}
export class ProductDTO {
  @Expose()
  @IsOptional()
  id?: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  currentQuantity!: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @Expose()
  @Type(() => ImgProductDTO)
  @IsOptional()
  imgProducts?: ImgProductDTO[];

  @Expose()
  @Type(() => CategoryProduct)
  @IsNotEmpty()
  category!: CategoryProduct;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isActivated!: boolean;

  @Expose()
  @IsOptional()
  @IsNumber()
  amountToSell?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  averageWeight?: number;

  @Expose()
  @Type(() => Measurement)
  @IsNotEmpty()
  measurement!: Measurement;

  @Expose()
  @Type(() => Nutrition)
  @IsOptional()
  nutrition?: Nutrition;
}




export class ImgProductDTO {
    @Expose()  
    id!: number;
  
    @Expose()
    imageUrl!: string;
  
    @Expose()
    publicId!: string;
    
}

