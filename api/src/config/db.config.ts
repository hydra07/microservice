import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Notification } from '@/entity/notification.entity';
import { Post } from '@/entity/post.entity';
import env from '@/util/validateEnv';
const AppDataSource = new DataSource({
  type: 'mongodb',
  host: env.MONGO_HOST,
  port: env.MONGO_PORT,
  database: env.MONGO_DB,
  // useUnifiedTopology: true,
  // useNewUrlParser: true,

  synchronize: true,
  logging: true,
  // entities: [__dirname + '/entity/*.ts'],
  entities: [Notification, Post],
  migrations: [],
  subscribers: [],
  maxQueryExecutionTime: 2000, // thời gian tối đa mà một câu query được thực thi
});

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,

  synchronize: true,
  logging: true,
  entities: [],
  migrations: [],
  subscribers: [],
  maxQueryExecutionTime: 2000,
});

export default AppDataSource;
export { PostgresDataSource };
