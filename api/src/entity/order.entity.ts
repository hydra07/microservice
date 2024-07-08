import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";
import { User } from "./user.entity";
import { OrderItem } from "./orderItem.entity";

@Entity("orders")
export class Order extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column()
  name?: string;

  @Column()
  total?: number;

  @Column()
  status?: string;

  @Column()
  shipAddress?: string;

  @Column()
  phone?: string;

  @Column()
  email?: string;

  @Column()
  paymentMethod?: string;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { eager: true, cascade: true })
  orderItems?: OrderItem[];

  //create date
  @Column()
  createdAt?: Date;

  @Column({ nullable: true })
  shipDate?: Date; 
  

}
