import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '../entity/post.entity';

const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'POST_DATABASE',
  // useUnifiedTopology: true,
  // useNewUrlParser: true,

  synchronize: true,
  logging: true,
  // entities: [__dirname + '/entity/*.ts'],
  entities: [Post],
  migrations: [],
  subscribers: [],
  maxQueryExecutionTime: 2000, // thời gian tối đa mà một câu query được thực thi
});

export default AppDataSource;
