import routers from "@/router/router";
import "@/strategies/discord-strategy";
import "@/strategies/google-strategy";
import env from "@/util/validateEnv";
import Cookieparser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";
import path from "path";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL, // Replace with your client domain
    credentials: true,
  }),
);

// app.use(
//   session({
//     secret: 'visaotoikhongtheyeuem',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 60000 * 60 * 24 }, // 1 day
//   }),
// );
// app.use(passport.initialize({}));
// app.use(passport.session());

app.use(Cookieparser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(passport.initialize());

app.use("/uploads", express.static(path.join(__dirname, "../../../uploads")));
app.use("/api/hello", (req, res) => {
  res.send("Hello World");
});

// Use the imported routers
routers.forEach(({ path, router }) => {
  app.use(path, router);
});

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   let errorMessage = 'An unknown error occurred';
//   let statusCode = 500;
//   if (isHttpError(error)) {
//     statusCode = error.status;
//     errorMessage = error.message;
//   }
//   console.log(error);
//   res.status(statusCode).json({ error: errorMessage });
// });
//
// app.use((req, res, next) => {
//   next(createHttpError(404, 'Not found'));
// });

export default app;
