import { User } from '@/type/user';
import 'express';
declare module 'express' {
  export interface Request {
    filePath?: string;
  }

  export interface RequestWithUser extends Request {
    user?: User;
  }
}
