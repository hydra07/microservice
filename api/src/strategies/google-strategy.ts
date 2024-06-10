import { PostgresDataSource } from '@/config/db.config';
import { RefreshToken } from '@/entity/refreshToken.entity';
import { User } from '@/entity/user.entity';
import UserService from '@/service/user.service';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/util/tokenGenerate';
import env from '@/util/validateEnv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRole } from '../@types/user.d';
const userService = new UserService();

export default passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: env.GOOGLE_CALLBACK_URL || '',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Starting user lookup');
        let user = await userService.findUserById(profile.id);
        if (!user) {
          user = new User();
          user.id = profile.id;
          user.username = profile.displayName;
          user.email = profile.emails![0].value;
          // if (profile.photos![0].value) {
          //   user.avatar = profile.photos![0].value;
          // }
          user.avatar = profile.photos![0].value;
          user.role = UserRole.USER;
          await userService.saveUser(user);
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
          await userService.saveUser(user);
          console.log('User found:', user);
          return done(null, {
            user,
            jwtAccessToken,
            jwtRefreshToken,
          });
        } else {
          console.log('User not found');
          return done(null, false);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        return done(undefined, false);
      }
    },
  ),
);
