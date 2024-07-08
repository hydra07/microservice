import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from "typeorm";

@Entity("recipes")
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "text" })
    foodName?: string;

    @Column({ type: "text" })
    description?: string;

    @Column({ type: "int" })
    portion?: number;

    @Column({ type: "int" })
    cookTime?: number;

    @Column({ type: "text" })
    imageUrl?: string;

    @Column({ type: "json", nullable: true })
    ingredients?: { name: string; quantity: number; unit: string }[];

    @Column({ type: "jsonb", nullable: true })
    steps?: { description: string; image: string }[];
}
