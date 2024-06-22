import { requireAuth } from '@/middleware/authJwt';
import NotificationService from '@/service/notification.service';
import { NextFunction, RequestWithUser, Response, Router } from 'express';
const router = Router();
const notificationService = new NotificationService();
router.get(
  '/notification',
  requireAuth,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // const userId = req.user.id;
    const userId = req.user.id;
    const number = req.query.number
      ? parseInt(req.query.number as string)
      : undefined;
    const skip = req.query.skip
      ? parseInt(req.query.skip as string)
      : undefined;
    const take = req.query.take
      ? parseInt(req.query.take as string)
      : undefined;
    const { notifications, total } =
      await notificationService.getNotificationsByUserId(userId, skip, take);
    return res.status(200).json(notifications);
  },
);
export default router;
