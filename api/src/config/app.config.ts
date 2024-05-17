import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import postRouter from '../router/post.router';
import env from '../util/validateEnv';
const app = express();
app.use(
  cors({
    origin: env.CLIENT_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/hello', (req, res) => {
  res.send('Hello World');
});
app.use('/api', postRouter);

app.use((res, req, next) => {
  next(createHttpError(404, 'Not found'));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
export default app;
