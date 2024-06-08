import {Expose} from "class-transformer";

export class MeasurementDTO {
    @Expose()
    id!: number;

    @Expose()
    name!: string;
}


