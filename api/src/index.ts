// import app from './config/app.config';
import 'dotenv/config';
import AppDataSource, { PostgresDataSource } from './config/db.config';
import app from './config/socket.config';
import env from './util/validateEnv';
async function main() {
  try {
    // await createConnection();
    AppDataSource.initialize();
    console.log('Connected to the Mongodb');
    PostgresDataSource.initialize();
    console.log('Connected to the Postgres');
    app.listen(env.PORT, () =>
      console.log(`Server is running on port http://localhost:${env.PORT}`),
    );
  } catch (error) {
    console.log('TypeORM connection error: ', error);
  }
}

await main();
