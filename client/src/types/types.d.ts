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
  
    export type CategoryProduct = {
      id: string;
      name: string;
      isActive: boolean;
    };
  }
  