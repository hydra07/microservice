import { PostgresDataSource } from '@/config/db.config';
import { RefreshToken } from '@/entity/refreshToken.entity';

class RefreshTokenService {
  private refreshTokenRepo = PostgresDataSource.getRepository(RefreshToken);

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
}

export default RefreshTokenService;
