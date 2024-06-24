import authService from "@/service/auth.service";
import RefreshTokenService from "@/service/refreshToken.service";
import UserService from "@/service/user.service";

import {
  generateAccessToken,
  generateRefreshToken,
} from "@/util/tokenGenerate";
import env from "@/util/validateEnv";

import { NextFunction, Request, RequestWithUser, Response } from "express";

import jwt from "jsonwebtoken";

export default class AuthController {
  private refreshTokenService = new RefreshTokenService();
  private UserService = new UserService();
  private authService = new authService();

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.authenticate(req.body);
      if (result) {
        const { user, jwtAccessToken, jwtRefreshToken } = result;
        // console.log(result);
        res.status(200).json({ user, jwtAccessToken, jwtRefreshToken });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  };

  // authenticate: RequestHandler = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const result = await this.authService.authenticate(req.body);
  //     if (result) {
  //       const { user, jwtAccessToken, jwtRefreshToken } = result;
  //       console.log(result);
  //       res.status(200).json({ user, jwtAccessToken, jwtRefreshToken });
  //       next();
  //     } else {
  //       res.status(401).send("Unauthorized");
  //       next();
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  saveTokenToCookie = (req: RequestWithUser, res: Response) => {
    console.log("saveTokenToCookie");
    try {
      const user = req.user;
      if (user?.accessToken && user?.refreshToken) {
        // res.cookie("accessToken", user.accessToken, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "strict",
        //   maxAge: Number(env.EXPIRE_JWT),
        // });

        // res.cookie("refreshToken", user.refreshToken, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "strict",
        //   maxAge: Number(env.EXPIRE_REFRESH),
        // });
        const redirectUrl = `http://localhost:4000/auto-close?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`;
        res.redirect(redirectUrl);
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (error) {
      console.error("Error in saveTokenToCookie:", error);
    }
  };

  refreshToken = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send("Refresh token is required");
    }

    try {
      const decoded = jwt.verify(refreshToken, env.REFRESH_SECRET) as {
        id: string;
        role: string;
      };
      const userId = decoded.id;
      const userRole = decoded.role;

      // const refreshTokenEntity =
      //   await this.refreshTokenService.findTokenByUserId(userId);

      const refreshTokenEntity =
        await this.UserService.findRefreshTokenByUserId(userId);

      if (!refreshTokenEntity) {
        return res.status(401).send("Refresh token not found");
      }

      if (refreshToken !== refreshTokenEntity.token) {
        return res.status(401).send("Refresh token is invalid");
      }

      const newAccessToken = generateAccessToken(userId, userRole);
      const newRefreshToken = generateRefreshToken(userId, userRole);

      //update refreh token to db
      refreshTokenEntity.token = newRefreshToken;
      refreshTokenEntity.expiryDate = new Date(
        Date.now() + Number(env.EXPIRE_REFRESH) * 1000
      );
      await this.refreshTokenService.saveToken(refreshTokenEntity);

      // res.cookie('accessToken', newAccessToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      //   maxAge: Number(env.EXPIRE_JWT),
      // });

      // res.cookie('refreshToken', newRefreshToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      //   maxAge: Number(env.EXPIRE_REFRESH),
      // });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Error in refreshToken:", error);
      next(error);
    }
  };
}
