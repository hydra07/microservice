import { Expose } from "class-transformer";

export class BaseDTO {
    @Expose()
    id!: number | string;
}