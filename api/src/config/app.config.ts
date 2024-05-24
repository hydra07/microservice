import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import postRouter from '../router/post.router';
import env from '../util/validateEnv';
import "../strategies/discord-strategy"
import passport from 'passport';
import userRouter from '../router/user.router';
import session from 'express-session';
import Cookieparser from 'cookie-parser';
import authRouter from '../router/auth.router';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
const app = express();

app.use(cors({
  origin: 'http://localhost:5173/', // Replace with your client domain
  credentials: true,
}));

app.use(
  cors({
    origin: env.CLIENT_URL,
  }),
);
app.use(Cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'visaotoikhongtheyeuem',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 60 * 24} // 1 day
}));
app.use(passport.initialize());
// app.use(passport.session());


app.use('/api/hello', (req, res) => {
  res.send('Hello World');
});
app.use('/api', postRouter);
app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);

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
