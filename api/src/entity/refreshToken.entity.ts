import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  token?: string;

  @Column("timestamp")
  expiryDate?: Date;

}
