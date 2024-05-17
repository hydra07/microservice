import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
  // MONGO_URI: str(),
  PORT: port(),
  CLIENT_URL: str(),
  MONGO_HOST: str(),
  MONGO_PORT: port(),
  MONGO_DB: str(),
  // JWT_SECRET: str(),
  // SESSION_SECRET: str(),
});
