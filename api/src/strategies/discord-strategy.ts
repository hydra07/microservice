import passport, { Profile } from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import {PostgresDataSource} from "../config/db.config";
import { User } from "../entity/user.entity";
import env from "../util/validateEnv";
import { VerifyCallback } from "passport-oauth2";

const userRepo = PostgresDataSource.getRepository(User);

passport.serializeUser((user: User, done) => {
  console.log('Serialize User:', user);
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log('Deserialize User:', id);
  try {
    const user = await userRepo.findOneBy({ id });
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

export default passport.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT_ID || "",
      clientSecret: env.DISCORD_CLIENT_SECRET || "",
      callbackURL: env.DISCORD_CALLBACK_URL || "",
      scope: ["identify", "email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile,
      done: VerifyCallback
    ) => {
      console.log('Strategy callback called');  // New log
      try {
        console.log('Profile:', profile);  // Existing log
        let user = await userRepo.findOneBy({ id: profile.id });

        if (!user) {
          user = new User();
          user.id = profile.id;
          user.username = profile.username;
          user.email = profile.email;

          await userRepo.save(user);
          done(null, user);
        }
        done(null, user);
      } catch (error) {
        console.error(error);
        done(error, false);
      }
    }
  )
);
