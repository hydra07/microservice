// import app from './config/app.config';
import { MongoDataSource, PostgresDataSource } from "@/config/db.config";
import  server  from "@/config/socket.config";
import env from "@/util/validateEnv";
import "dotenv/config";
async function main() {
  try {
    // await createConnection();
    await MongoDataSource.initialize();
    console.log("Connected to the Mongodb");
    await PostgresDataSource.initialize();
    console.log("Connected to the Postgres");
    server.listen(env.PORT, () =>
      console.log(`Server is running on port http://localhost:${env.PORT}`),
    );
  } catch (error) {
    console.log("TypeORM connection error: ", error);
  }
}
await main();
