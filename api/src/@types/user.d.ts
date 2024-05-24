interface User {
  // Define other properties as needed
  accessToken: string;
  refreshToken: string;
}
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
export { User, UserRole };
