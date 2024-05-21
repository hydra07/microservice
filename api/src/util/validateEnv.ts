import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
  // MONGO_URI: str(),
  PORT: port(),
  CLIENT_URL: str(),
  MONGO_HOST: str(),
  MONGO_PORT: port(),
  MONGO_DB: str(),
  POSTGRES_HOST: str(),
  POSTGRES_PORT: port(),
  POSTGRES_USERNAME: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DB: str(),
  // JWT_SECRET: str(),
  // SESSION_SECRET: str(),
  DISCORD_CLIENT_ID: str(),
  DISCORD_CLIENT_SECRET: str(),
  DISCORD_CALLBACK_URL: str(),

});
