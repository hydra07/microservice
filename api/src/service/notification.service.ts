import { MongoDataSource } from '@/config/db.config';
import { Notification } from '@/entity/notification.entity';
export default class NotificationService {
  private notificationRepository = MongoDataSource.getRepository(Notification);
  async getNotificationsByUserId(userId: string, skip?: number, take?: number) {
    const query = { userId };
    const options: any = {
      // sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo giảm dần
      // select: ['_id', 'title', 'content', 'createdAt'],
      order: {
        createdAt: 'DESC',
      },
    };
    if (take) {
      options.take = take; // Giới hạn số lượng kết quả
    }
    if (skip) {
      options.skip = skip; // Bỏ qua số lượng kết quả
    }
    const [notifications, total] =
      await this.notificationRepository.findAndCount({
        where: query,
        ...options,
      });
    // console.log(notifications, total);
    return { notifications, total };
  }
}
