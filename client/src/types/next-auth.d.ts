import NextAuth from "next-auth/next";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // user: {
    //   id: number;
    //   email: string;
    //   name: string;
    //   image: string;
    //   gender: boolean;
    //   phone:string;
    //   accessToken: string;
    //   role:Array<string>;
    //   // refreshToken: string;
    // }
    user: {
      id:string;
      email:string;
      username: string;
      avatar: string;
      accessToken: string;
      refreshToken: string;
      role: 'user' | 'admin';

    }
  };
  interface User {
    id: string;
    email: string;
    username: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
    role: 'user' | 'admin';
  }
}