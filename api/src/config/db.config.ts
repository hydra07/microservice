import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Notification } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import env from '../util/validateEnv';
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

export default AppDataSource;
