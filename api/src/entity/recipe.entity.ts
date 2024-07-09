import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

@Entity("recipe")
export class Recipe extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column("text")
  @IsString()
  title?: string;

  @Column("text")
  @IsString()
  userId?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @Column("array")
  @IsArray()
  // @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @Column("array")
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  steps: ObjectId[] = [];

  @Column("array")
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  ingredients: ObjectId[] = [];

  @Column("number")
  @IsNumber()
  cook_time?: number;

  @Column("number")
  @IsNumber()
  serving?: number;

  @Column("boolean")
  @IsBoolean()
  isActivate?: boolean = false;
}
