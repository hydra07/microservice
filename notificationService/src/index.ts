import app from './config/app.config';
import AppDataSource from './config/db.config';

async function main() {
  try {
    // await createConnection();
    AppDataSource.initialize();
    console.log('Connected to the database');
    app.listen(3000, () => console.log('Server is running on port 3000'));
  } catch (error) {
    console.log('TypeORM connection error: ', error);
  }
}

await main();
