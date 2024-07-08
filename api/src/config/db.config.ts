import { CategoryProduct } from "@/entity/categoryProduct.entity";
import { Comment } from "@/entity/comment.entity";
import { Product } from "@/entity/product.entity";
import { Measurement } from "@/entity/measurement.entity";
import { Notification } from "@/entity/notification.entity";
import { Nutrition } from "@/entity/nutrition.entity";
import { Order } from "@/entity/order.entity";
import { OrderItem } from "@/entity/orderItem.entity";
import { Post } from "@/entity/post.entity";
import { RefreshToken } from "@/entity/refreshToken.entity";
import { User } from "@/entity/user.entity";
import { ImgProduct } from "@/entity/imgProduct.entity";
import env from "@/util/validateEnv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Recipe } from "@/entity/recipe.entity.ts";
import { Step } from "@/entity/recipeStep.entity.ts";
import { Ingredient } from "@/entity/ingredient.entity.ts";
// import { Notification } from '@/entity/notification.entity';
// import { Post } from '@/entity/post.entity';
// import env from '@/util/validateEnv';
const MongoDataSource = new DataSource({
  type: "mongodb",
  host: env.MONGO_HOST,
  port: env.MONGO_PORT,
  database: env.MONGO_DB,
  // useUnifiedTopology: true,
  // useNewUrlParser: true,

  synchronize: true,
  logging: false,
  // entities: [__dirname + '/entity/*.ts'],
  entities: [Notification, Post, Comment, Recipe, Step, Ingredient],
  migrations: [],
  subscribers: [],
  maxQueryExecutionTime: 2000, // thời gian tối đa mà một câu query được thực thi
});

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,

  synchronize: true,
  logging: false,
  entities: [
    User,
    RefreshToken,
    CategoryProduct,
    Product,
    Nutrition,
    Measurement,
    // Recipe,
    ImgProduct,
    Order,
    OrderItem,
  ],
  migrations: [],
  subscribers: [],
  maxQueryExecutionTime: 2000,
});

export { MongoDataSource, PostgresDataSource };
