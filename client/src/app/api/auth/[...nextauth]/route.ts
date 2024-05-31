import Google from 'next-auth/providers/google';
// import { authOptions } from '@/server/auth';
import axios from 'axios';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // accessTokenUrl: 'http://localhost:3000/api/auth/google',
      // authorization: 'http://localhost:3000/api/auth/callback/google',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const initUser: User = {
        id: user.id as string,
        username: user.name as string,
        email: user.email as string,
        avatar: user.image as string,
      };
      const res = await axios.post(
        'http://localhost:3000/api/auth/authenticate',
        initUser,
      );
      // const data = res.data; // {}
      if (res.data) {
        (user as any).id = res.data.user.id;
        (user as any).username = res.data.user.username;
        (user as any).email = res.data.user.email;
        (user as any).avatar = res.data.user.avatar;
        (user as any).role = res.data.user.role;
        (user as any).accessToken = res.data.jwtAccessToken;
        (user as any).refreshToken = res.data.jwtRefreshToken;
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.id = (user as any).id;
        token.username = (user as any).username;
        token.email = (user as any).email;
        token.avatar = (user as any).avatar;
        token.role = (user as any).role;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log('session->', session.user);
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.avatar = token.avatar;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}
