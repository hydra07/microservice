import authRouter from '@/router/auth.router';
import categoryProductRouter from '@/router/categoryProduct.router';
import commentRouter from '@/router/comment.router';
import measurementRouter from '@/router/measurement.router';
import postRouter from '@/router/post.router';
import productRouter from '@/router/product.router';
import recipeRouter from '@/router/recipe.router';
import uploadRouter from '@/router/upload.router';
import '@/strategies/discord-strategy';
import '@/strategies/google-strategy';
import env from '@/util/validateEnv';
import Cookieparser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
// import session from 'express-session';
import ImageUploadRouter from '@/router/imageUpload';
import notificationRouter from '@/router/notification.router';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL, // Replace with your client domain
    credentials: true,
  }),
);

app.use(
  cors({
    origin: env.CLIENT_URL,
  }),
);
app.use(morgan(':method :url :status in :response-time ms'));
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
app.use('/api', notificationRouter);
// app.use('/api/user', userRouter);
//Upload router
app.use('/api', uploadRouter);
app.use('/api', ImageUploadRouter);

export default app;
