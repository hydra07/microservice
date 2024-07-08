import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, Max, Min, IsArray, ValidateNested } from "class-validator";

class ImageUrlDto {
  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @IsNotEmpty()
  @IsString()
  publicId!: string;
}

export class CreateReviewDto {
  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  @IsNumber()
  productId!: number;

  @IsNotEmpty()
  @IsNumber()
  orderItemId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageUrlDto)
  imageUrls?: ImageUrlDto[];
}


