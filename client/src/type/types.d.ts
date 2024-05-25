// src/type/types.d.ts
declare module 'CustomTypes' {
    export interface User {
        accessToken: string;
        refreshToken: string;
    }

    export type AuthState = {
        isLoggedIn: boolean;
        user: User;
        error: string;
    };
}
