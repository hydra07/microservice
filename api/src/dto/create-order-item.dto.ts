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
  @IsOptional()
  id?: number;

  @IsString()
  userId!: string; //user id


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


  // export class OrderItemType {
  //   @IsNumber()
  //   id!: number;

  //   @IsNumber()
  //   @Expose({ name: 'productId' })
  //   @Transform(({ obj }) => obj.product.id)
  //   productId!: number;

  //   @IsString()
  //   name!: string;

  //   @IsNumber()
  //   quantity!: number;

  //   @IsNumber()
  //   price!: number;

  //   @IsString()
  //   image!: string;
  // }

  // export class OrderType {
    
  //   id!: number;

  //   @IsString()
  //   @Expose({ name: 'userId' })
  //   @Transform(({ obj }) => obj.user.id)
  //   userId!: string;

  //   @IsString()
  //   @Expose({ name: 'createdAt' })
  //   createAt!: string;

  //   @IsOptional()
  //   @IsString()
  //   shipDate?: string;

  //   @IsNumber()
  //   total!: number;

  //   @IsString()
  //   status!: string;

  //   @Expose({ name: 'orderItems' })
  //   @IsArray()
  //   @Type(() => OrderItemType)
  //   orderItems!: OrderItemType[];

  //   @IsOptional()
  //   @IsString()
  //   name?: string;

  //   @IsOptional()
  //   @IsString()
  //   phone?: string;

  //   @IsOptional()
  //   @IsString()
  //   email?: string;

  //   @IsOptional()
  //   @IsString()
  //   paymentMethod?: string;

  //   @IsOptional()
  //   @IsString()
  //   shipAddress?: string;


  // }