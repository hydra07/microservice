import { Request } from "express";

interface User {
  // Define other properties as needed
  accessToken: string;
  refreshToken: string;
}

interface RequestWithUser extends Request {
  user?: User; // Optional, as `user` might not always be present
}
