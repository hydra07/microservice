import { PostgresDataSource } from "@/config/db.config";
import { RefreshToken } from "@/entity/refreshToken.entity";
import { User } from "@/entity/user.entity";
import UserService from "@/service/user.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/util/tokenGenerate";
import env from "@/util/validateEnv";
import { UserRole } from "@/@types/user.d";
export default class AuthService {
  private userService = new UserService();

  async authenticate(profile: any) {
    try {
      let user = await this.userService.findUserById(profile.id);
      if (!user) {
        user = new User();
        user.id = profile.id;
        user.username = profile.username;
        user.email = profile.email;
        user.avatar = profile.avatar;
        user.role = UserRole.USER;
        await this.userService.saveUser(user);
      }
      if (user?.id && user?.role) {
        const jwtAccessToken = generateAccessToken(user.id, user.role);
        const jwtRefreshToken = generateRefreshToken(user.id, user.role);

        const refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.token = jwtRefreshToken;
        refreshTokenEntity.expiryDate = new Date(
          Date.now() + env.EXPIRE_REFRESH * 1000,
        );
        await PostgresDataSource.getRepository(RefreshToken).save(
          refreshTokenEntity,
        );

        user.refreshTokenId = refreshTokenEntity.id;
        await this.userService.saveUser(user);
        console.log("User found:", user);
        return {
          user,
          jwtAccessToken,
          jwtRefreshToken,
        };
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.error("Error in authenticate:", error);
    }
  }
}
