import authRouter from '@/router/auth.router';
import categoryProductRouter from '@/router/categoryProduct.router';
import commentRouter from '@/router/comment.router';
import measurementRouter from '@/router/measurement.router';
import postRouter from '@/router/post.router';
import productRouter from '@/router/product.router';
import uploadRouter from '@/router/upload.router';
import recipeRouter from '@/router/recipe.router';
import '@/strategies/discord-strategy';
import '@/strategies/google-strategy';
import env from '@/util/validateEnv';
import Cookieparser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
// import session from 'express-session';
import ImageUploadRouter from '@/router/imageUpload';
import createHttpError, { isHttpError } from 'http-errors';
import passport, { session } from 'passport';
import path from 'path';
import searchRouter from '@/router/searchRouter';

const app = express();

app.use(
  cors({
    origin:  'http://localhost:4000' ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Replace with your client domain
    
  }),
);

// app.use(
//   cors({
//     origin:'http://localhost:4000',
//   }),
// );
app.use(Cookieparser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(
//   session({
//     secret: 'visaotoikhongtheyeuem',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 60000 * 60 * 24 }, // 1 day
//   }),
// );
app.use(passport.initialize({}));
// app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));
app.use('/api/hello', (req, res) => {
  res.send('Hello World');
});

app.use('/api/auth', authRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', recipeRouter);
app.use('/api', productRouter);
app.use('/api', measurementRouter);
app.use('/api', categoryProductRouter);
app.use('/api', searchRouter);
// app.use('/api/user', userRouter);

app.use('/api', uploadRouter);
// app.use('/api', ImageUploadRouter);

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
  console.log(error);
  res.status(statusCode).json({ error: error.message });
});
export default app;
