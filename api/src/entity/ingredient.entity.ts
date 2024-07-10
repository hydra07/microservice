import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { IsNumber, IsString } from "class-validator";

@Entity("ingredient")
export class Ingredient extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column("text")
  @IsString()
  name?: string;

  @Column("text")
  @IsString()
  unit?: number;

  @Column("number")
  @IsNumber()
  quantity?: number;

  //TODO: add product && measurement
}
