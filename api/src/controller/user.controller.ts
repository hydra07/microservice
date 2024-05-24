import { NextFunction, Request, Response } from 'express';
import UserService from '@/service/user.service';

export default class UserController {
  private userService = new UserService();

  goToUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('goToUserProfile called');
      // Add any additional processing logic if needed
      res.sendStatus(200);
    } catch (error) {
      console.error('Error in goToUserProfile:', error);
      next(error);
    }
  };
}

export const userController = new UserController();
