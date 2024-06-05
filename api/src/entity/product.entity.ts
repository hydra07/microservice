import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { ImgProduct } from "./imgProduct.entity";
import { CategoryProduct } from "./categoryProduct.entity";
import { Measurement } from "./measurement.entity";
import { Nutrition } from "./nutrition.entity";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "text" })
  name?: string;

  @Column({ type: "text" })
  description?: string;

  @Column()
  currentQuantity?: number;

  @Column({ type: "double precision" })
  price?: number;

  @OneToMany(() => ImgProduct, (imgProduct) => imgProduct.product)
  imgProducts?: ImgProduct[];

  @ManyToOne(() => CategoryProduct)
  @JoinColumn({ name: "category_id" })
  category?: CategoryProduct;

  @Column()
  is_activated?: boolean;

  @Column({ type: "double precision", nullable: true })
  amountToSell?: number;

  @Column({ type: "double precision" })
  averageWeight?: number;

  @OneToOne(() => Measurement)
  @JoinColumn({ name: "measurement_id" })
  measurement?: Measurement;

  @OneToOne(() => Nutrition)
  @JoinColumn({ name: "nutrition_id" })
  nutrition?: Nutrition;

  // @Column({ type: "text" })
  // tags?: string;
}
