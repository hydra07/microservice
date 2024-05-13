import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { NotificationService } from '../service/notification.service';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    // origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
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

io.on('connection', (socket) => {
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

// app.use(express.json());
// app.use('/api/hello', (req, res) => {
//   res.send('Hello World');
// });c

// app.use((res, req, next) => {
//   next(createHttpError(404, 'Not found'));
// });

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   let errorMessage = 'An unknown error occurred';
//   let statusCode = 500;
//   if (isHttpError(error)) {
//     statusCode = error.status;
//     errorMessage = error.message;
//   }
//   res.status(statusCode).json({ error: errorMessage });
// });
// export default app;

export default server;
