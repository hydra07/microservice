import { Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested, IsArray, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  productId!: number;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  subtotal!: number;
}

export class CreateOrderDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsString()
  email!: string;

  @IsEnum(['cod', 'vnpay']) // Add other payment methods as needed
  paymentMethod!: string;

  @IsString()
  shipAddress!: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems!: CreateOrderItemDto[];
}
