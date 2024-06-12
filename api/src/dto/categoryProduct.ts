import { Expose } from "class-transformer";

export class CategoryProductDTO {
    @Expose()
    id!: number;

    @Expose()
    name?: string;
}