import { MongoDataSource } from '@/config/db.config';
import { Notification } from '@/entity/notification.entity';
import { Server, Socket } from 'socket.io';

export default class NotificationService {
  private socketIo: Server;
  private notificationRepository = MongoDataSource.getRepository(Notification);
  private userSocketMap = new Map(); //Cái này sẽ lưu danh sách user đang online
  constructor(socketIo: Server) {
    this.socketIo = socketIo;
    this.init();
  }
  init() {
    this.socketIo.on('connection', async (socket) => {
      this.handleConnection(socket);
    });
  }
  async getNotificationsByUserId(userId: string, numberNoti?: number) {
    // const notifications = await this.notificationRepository.find({
    //   where: { userId },
    // });
    // return notifications;
    const query = { userId };
    const options: any = {
      sort: { createAt: -1 }, // Sắp xếp theo thời gian tạo giảm dần
    };

    if (numberNoti) {
      options.take = numberNoti; // Giới hạn số lượng kết quả
    }

    const notifications = await this.notificationRepository.find({
      where: query,
      ...options,
    });

    return notifications;
  }
  async createNotification(notification: Notification) {
    const socketId = this.userSocketMap.get(notification.userId);
    console.log('notification: ', notification);
    const savedNotification = await this.notificationRepository.save(
      notification,
    );
    console.log('savedNotification', savedNotification);
    if (socketId) {
      this.socketIo.to(socketId).emit('notification', savedNotification);
    }
    return savedNotification;
  }
  async getNotifications() {
    const notifications = await this.notificationRepository.find();
    return notifications;
  }
  async connectedUser(userId: string, socketId: string) {
    this.userSocketMap.set(userId, socketId);
  }
  async disconnectedUser(userId: string) {
    this.userSocketMap.delete(userId);
  }
  async handleConnection(socket: Socket) {
    socket.on('register', async (userId: string) => {
      await this.connectedUser(userId, socket.id);
      console.log(`User ${userId} connected with socket id ${socket.id}`);
    });
    socket.on('createNotification', async (data) => {
      console.log('create noti');
      const saveNotification = await this.createNotification(data);
      socket.emit('notificationCreated', saveNotification);
    });
    socket.on('getNotifications', async () => {
      console.log('get noti');
      const notifications = await this.getNotifications();
      console.log(notifications);
      socket.emit('notifications', JSON.stringify(notifications));
    });
    socket.on('disconnect', async () => {
      await this.disconnectedUser(socket.id);
      console.log('A user disconnected');
    });
  }
}
