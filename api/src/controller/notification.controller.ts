import { NextFunction, Request, Response } from 'express';
import { io } from '../config/socket.config';
import NotificationService from '../service/notification.socket.service';
class NotificationController {
  private notificationService = new NotificationService(io);
  // async addNotification
  // }

  async getNotificationByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.params.userId;
    const notifications =
      await this.notificationService.getNotificationsByUserId(userId);
    res.status(200).json(notifications);
  }
}
export default NotificationController;
