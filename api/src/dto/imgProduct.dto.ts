import { Expose } from "class-transformer";

export class ImgProductDTO {
  @Expose()  
  id!: number;

  @Expose()
  imageUrl!: string;

  @Expose()
  publicId!: string;
  
  }