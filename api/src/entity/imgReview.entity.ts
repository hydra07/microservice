import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Review } from "./review.entity";

@Entity("img_reviews")
export class ImgReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @Column({ type: "text" })
  @IsNotEmpty()
  @IsString()
  publicId!: string;

  @ManyToOne(() => Review, (review) => review.imgReviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "review_id" })
  review!: any;
}
