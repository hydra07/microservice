import { PostgresDataSource } from '@/config/db.config';
import { RefreshToken } from '@/entity/refreshToken.entity';
import { User } from '@/entity/user.entity';

class UserService {
  private userRepository = PostgresDataSource.getRepository(User);
  private refreshTokenRepository = PostgresDataSource.getRepository(User);
  //save user
  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }

  //find user by id
  async findUserById(id: string) {
    // console.log('sss', id);
    return await this.userRepository.findOneBy({ id: id });
  }

  async findRefreshTokenByUserId(userId: string): Promise<RefreshToken | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return await this.refreshTokenRepository.findOneBy({
      id: user?.refreshTokenId,
    });
  }
}

export default UserService;
