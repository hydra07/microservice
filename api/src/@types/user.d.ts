interface User {
  // Define other properties as needed
  accessToken: string;
  refreshToken: string;
}
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
interface UserPayload {
  id: string;
  role: string;
}
export { User, UserRole,UserPayload };
