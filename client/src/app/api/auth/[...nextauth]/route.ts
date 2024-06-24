import Google from 'next-auth/providers/google';
// import { authOptions } from '@/server/auth';
import axios from '@/lib/axios';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
async function refreshToken(expired: string) {
  const expiryDate = new Date(expired);
  // console.log(Date.now() / 1000 - expiryDate.getTime() / 1000);
  // if (Date.now() / 1000 > expired.getTime() / 1000) {
  //   console.log('Token expired');
  //   return;
  // }
}

const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    maxAge: 15 * 60, //15 minutes
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const initUser: User = {
        id: user.id as string,
        username: user.name as string,
        email: user.email as string,
        avatar: user.image as string,
      };
      const res = await axios.post(`/api/auth/authenticate`, initUser);
      // const data = res.data; // {}
      if (res.data) {
        user.id = res.data.user.id;
        user.username = res.data.user.username;
        user.email = res.data.user.email;
        user.avatar = res.data.user.avatar;
        user.role = res.data.user.role;
        user.accessToken = res.data.jwtAccessToken;
        user.refreshToken = res.data.jwtRefreshToken;
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      // console.log('jwt chay');
      if (user) {
        token.accessToken = user.accessToken;
        // JWT.verify(
        //   user.accessToken,
        //   process.env.JWT_SECRET as string,
        //   async (err: any, decoded: any) => {
        //     console.log('Decoded:', decoded);
        //     //check if token is expired
        //     if (decoded && decoded.exp < Date.now() / 1000) {
        //       console.log('Token expired');
        //       await refreshToken(token);
        //     }
        //   },
        // );

        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.avatar = user.avatar;
        token.role = user.role;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.email = token.email as string;
      session.user.avatar = token.avatar as string;
      session.user.role = token.role as 'user' | 'admin';
      // console.log(session.expires);
      console.log(refreshToken(session.expires));
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
