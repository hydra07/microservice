import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { IsNotEmpty, IsString, IsNumber, Max, Min } from "class-validator";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { ImgReview } from "./imgReview.entity";

@Entity("reviews")
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @Column()
  rating!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @OneToMany(() => ImgReview, (imgReview) => imgReview.review, {
    cascade: true,
    eager: true,
  })
  imgReviews?: ImgReview[];
}
