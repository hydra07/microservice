import { Request } from "express";

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

interface RequestWithRole extends Request {
  role?: UserRole;
}

export { User, UserRole,UserPayload, RequestWithRole };
