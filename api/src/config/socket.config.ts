import { NotificationService } from '@/service/notification.service';
import env from '@/util/validateEnv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.config';
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['*'],
  },
});

const notificationService = new NotificationService(io);
app.post('/notification', async (req, res) => {
  const body = req.body;
  const notification = {
    title: body.title,
    content: body.content,
    createAt: new Date(),
    userId: body.userId,
  };

  // console.log('notification -> ', notification);
  const savedNotification = await notificationService.createNotification(
    notification,
  );
  io.emit('notifications', savedNotification);

  res.status(201).json({
    message: 'Notification created successfully',
    notification: savedNotification,
  });
});
io.on('connection', async (socket) => {
  console.log('A user connected');

  socket.on('createNotification', async (data) => {
    console.log('create noti');
    const savedNotification = await notificationService.createNotification(
      data,
    );
    socket.emit('notificationCreated', savedNotification);
  });

  socket.on('getNotifications', async () => {
    console.log('get noti');
    const notifications = await notificationService.getNotifications();
    console.log(notifications);
    socket.emit('notifications', JSON.stringify(notifications));
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

export default server;
