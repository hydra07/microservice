import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nutritions")
export class Nutrition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "double precision" })
    calories?: number;

    @Column({ type: "double precision" })
    sugar?: number;

    @Column({ type: "double precision" })
    fat?: number;

    @Column({ type: "double precision" })
    sodium?: number;

    @Column({ type: "double precision" })
    carbs?: number;

    @Column({ type: "double precision" })
    fiber?: number;
}