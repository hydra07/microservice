import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("measurements")  // Add the @Entity decorator
export class Measurement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'text' })
    unit?: string;

}
