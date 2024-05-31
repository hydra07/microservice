declare module "CustomTypes" {
    export interface User {
      accessToken: string;
      refreshToken: string;
    }
  
    export type AuthState = {
      isLoggedIn: boolean;
      user: User;
      error: string;
      // isLoading: boolean;
    };

    export type UserInfo = {
      id: string;
      name: string;
      email: string;
      role: string;
      bio: string;
      avatar: string;
      address: string;
    };
    
  
    export type CategoryProduct = {
      id: string;
      name: string;
      isActive: boolean;
    };
  }
  