import { PostgresDataSource } from "@/config/db.config";
import { RefreshToken } from "@/entity/refreshToken.entity";
import UserService from "./user.service";
import { FindOneOptions } from "typeorm";
import { User } from "@/entity/user.entity";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/util/tokenGenerate";

class RefreshTokenService {
  private refreshTokenRepo = PostgresDataSource.getRepository(RefreshToken);
  private userService = new UserService();
  private userRepo = PostgresDataSource.getRepository(User);
  //save token
  async saveToken(token: RefreshToken) {
    return await this.refreshTokenRepo.save(token);
  }

  async findTokenById(id: string) {
    return await this.refreshTokenRepo.findOneBy({ id: id });
  }
  //find token by token
  // async findTokenByUserId(userId: string) {
  //   return await this.refreshTokenRepo.findOneBy({ userId: userId });
  // }

  async refreshToken(oldRefreshToken: string) {
    // Tìm refresh token trong cơ sở dữ liệu
    const tokenUpdate = await this.refreshTokenRepo.findOne({
      where: { token: oldRefreshToken },
      relations: ["user"],
    });
  
    if (!tokenUpdate) {
      throw new Error("Refresh token not found");
    }
  
    // Kiểm tra xem refresh token có còn hợp lệ không
    if (new Date() > tokenUpdate.expiryDate!) {
      throw new Error("Refresh token expired");
    }
  
    const user = await this.userService.findUserByRefreshToken(oldRefreshToken);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Tạo refresh token mới
    const newRefreshToken = generateRefreshToken(user.id!, user.role!);
  
    // Cập nhật refresh token trong cơ sở dữ liệu
    tokenUpdate.token = newRefreshToken;
    // Nếu bạn muốn cập nhật thời gian hết hạn, bạn có thể thêm dòng sau:
    // tokenUpdate.expiryDate = new Date(Date.now() + env.EXPIRE_REFRESH);
    
    await this.refreshTokenRepo.save(tokenUpdate);
  
    // Tạo access token mới
    const newAccessToken = generateAccessToken(user.id!, user.role!);
  
    // Trả về access token mới và refresh token mới
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default RefreshTokenService;
