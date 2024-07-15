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
  title!: string;

  @Column("text")
  @IsString()
  difficulty!: string;

  @Column("text")
  @IsString()
  description!: string;

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

  @Column(() => RecipeTag)
  @IsArray()
  @IsOptional()
  tags?: RecipeTag[];

  @Column("boolean")
  @IsBoolean()
  isPublished?: boolean = false;

  @Column("array")
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  comments?: ObjectId[] = [];

  @Column("array")
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  reactions?: ObjectId[] = [];
}

@Entity("recipeTag")
export class RecipeTag extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column("text")
  name!: string;
}

@Entity("recipeComment")
export class RecipeComment extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column("text")
  @IsString()
  content!: string;

  @Column("text")
  @IsString()
  userId?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsDate()
  createdAt?: Date = new Date();

  @Column(() => ObjectId)
  @IsMongoId()
  recipeId!: ObjectId;
}

@Entity("recipeReaction")
export class RecipeReaction extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column("text")
  @IsString()
  userId!: string;

  @Column(() => ObjectId)
  @IsMongoId()
  recipeId!: ObjectId;

  @Column("boolean")
  @IsBoolean()
  isLike: boolean = false;

  @Column("boolean")
  @IsBoolean()
  isHeart: boolean = false;

  @Column("boolean")
  @IsBoolean()
  isCookpot: boolean = false;
}
