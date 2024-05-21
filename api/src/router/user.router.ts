import { Router } from "express";
import UserController from "../controller/user.controller";
import passport from "passport";

const router = Router();
const userController = new UserController();

router.get("/auth/discord", passport.authenticate("discord"));

router.get(
  "/auth/discord/redirect",
  passport.authenticate("discord"), (req, res, next) => {
    console.log('Authentication successful');
    userController.goToUserProfile(req, res, next);
  }
);
export default router;
