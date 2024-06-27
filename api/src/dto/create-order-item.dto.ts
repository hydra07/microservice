import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested, IsArray, IsNumber, IsOptional } from 'class-validator';

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


export class OrderItemType {
  @IsNumber()
  @Expose({ name: 'productId' })
  @Transform(({ obj }) => obj.product.id)
  productId!: number;

  @IsString()
  name!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;

  @IsString()
  image!: string;
}

export class OrderType {
  @IsString()
  id!: string;

  @IsString()
  @Expose({ name: 'createdAt' })
  createAt!: string;

  @IsOptional()
  @IsString()
  shipDate?: string;

  @IsNumber()
  total!: number;

  @IsString()
  status!: string;

  @IsArray()
  @Type(() => OrderItemType)
  items!: OrderItemType[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  shipAddress?: string;

  @IsString()
  @Transform(({ obj }) => obj.user.id)
  userId!: string;
}