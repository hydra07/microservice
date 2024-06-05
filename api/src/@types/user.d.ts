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

interface PaginatedResult<ENTITY> {
  data: ENTITY[];
  total: number;
  limit: number;
  page: number;
  lastPage: number;
}

export { User, UserRole,UserPayload, RequestWithRole, PaginatedResult };
