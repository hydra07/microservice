import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { IsArray, IsOptional, IsString } from "class-validator";

@Entity("step")
export class Step extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column("text")
  @IsString()
  description?: string;

  @Column("array")
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];
}
