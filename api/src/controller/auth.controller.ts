import { NextFunction, Request, Response } from "express";
import env from "../util/validateEnv";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../util/tokenGenerate";
import { RequestWithUser } from "../type/types";
import jwt from "jsonwebtoken";
import RefreshTokenService from "../service/refreshToken.service";
import { RefreshToken } from "../entity/refreshToken.entity";

export default class AuthController {
  private refreshTokenService = new RefreshTokenService();

  saveTokenToCookie = (
    req: RequestWithUser,
    res: Response,
  ) => {
    console.log("saveTokenToCookie");
    try {
      const user = req.user;
      if (user?.accessToken && user?.refreshToken) {
        res.cookie("accessToken", user.accessToken, {
          httpOnly: true,
    
        });
        res.cookie("refreshToken", user.refreshToken, {
          httpOnly: true,
         
        });
        console.log(user);
        console.log("gui gui");
        res.redirect("http://localhost:5173");
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

      const refreshTokenEntity =
        await this.refreshTokenService.findTokenByUserId(userId);

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

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: Number(env.EXPIRE_JWT),
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: Number(env.EXPIRE_REFRESH),
      });


      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Error in refreshToken:", error);
      next(error);
    }
  };
}
