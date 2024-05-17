import { Server } from 'socket.io';
import AppDataSource from '../config/db.config';
import { Notification } from '../entity/notification.entity';

export class NotificationService {
  private socketIo: Server;
  private notificationRepository = AppDataSource.getRepository(Notification);
  constructor(socketIo: Server) {
    this.socketIo = socketIo;
  }

  async createNotification(notification: Notification) {
    console.log('notification: ', notification);
    const savedNotification = await this.notificationRepository.save(
      notification,
    );
    console.log('savedNotification', savedNotification);
    this.socketIo.emit('notification', savedNotification);
    return savedNotification;
  }

  async getNotifications() {
    const notifications = await this.notificationRepository.find();
    return notifications;
  }
}
