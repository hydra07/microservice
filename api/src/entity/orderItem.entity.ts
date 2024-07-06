import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity"; // Assuming you have a Product entity

@Entity("order_items")
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order?: Product;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column()
  quantity!: number;

  @Column()
  subtotal!: number;

  @Column({ default: false })
  isRated!: boolean;
}
