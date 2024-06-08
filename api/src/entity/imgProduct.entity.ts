import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("img_products")
export class ImgProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "text" })
  imageUrl?: string;

  @Column({type: "text"})
  publicId?: string;

  @ManyToOne(() => Product, (product) => product.imgProducts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product!: Product;
}
