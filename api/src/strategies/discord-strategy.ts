import env from '@/util/validateEnv';

import { UserRole } from '@/@types/user.d';
import { PostgresDataSource } from '@/config/db.config';
import { User } from '@/entity/user.entity';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

import {
  generateAccessToken,
  generateRefreshToken,
} from '@/util/tokenGenerate';
import { VerifyCallback } from 'passport-oauth2';

import { RefreshToken } from '@/entity/refreshToken.entity';
import UserService from '@/service/user.service';

const userService = new UserService();

export default passport.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT_ID || '',
      clientSecret: env.DISCORD_CLIENT_SECRET || '',
      callbackURL: env.DISCORD_CALLBACK_URL || '',
      scope: ['identify', 'email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile,
      done: VerifyCallback,
    ) => {
      console.log('Strategy callback called'); // New log
      try {
        console.log('Starting user lookup'); // New log
        const userService = new UserService();
        let user = await userService.findUserById(profile.id);
        console.log('User found:', user); // New log

        if (!user) {
          console.log('User not found, creating new user'); // New log
          user = new User();
          user.id = profile.id;
          user.username = profile.username;
          user.email = profile.email;

          if (profile.avatar) {
            user.avatar = profile.avatar;
          }
          user.role = UserRole.USER;

          await userService.saveUser(user);
          console.log('User created:', user); // New log
        }

        if (user?.id && user?.role) {
          const jwtAccessToken = generateAccessToken(user.id, user.role);
          const jwtRefreshToken = generateRefreshToken(user.id, user.role);

          // Save the refresh token in the database
          const refreshTokenEntity = new RefreshToken();
          refreshTokenEntity.token = jwtRefreshToken;
          refreshTokenEntity.expiryDate = new Date(
            Date.now() + env.EXPIRE_REFRESH * 1000,
          );
          await PostgresDataSource.getRepository(RefreshToken).save(
            refreshTokenEntity,
          );
          console.log('exipre', refreshTokenEntity.expiryDate);

          //update user refreshTokenId
          user.refreshTokenId = refreshTokenEntity.id;
          await userService.saveUser(user);

          console.log('Tokens generated:', jwtAccessToken, jwtRefreshToken); // New log
          // Pass tokens to the done callback
          return done(undefined, {
            user,
            accessToken: jwtAccessToken,
            refreshToken: jwtRefreshToken,
          });
        } else {
          console.error('User not found or missing ID or role:', user);
          return done(undefined, user);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        return done(undefined, false);
      }
    },
  ),
);
