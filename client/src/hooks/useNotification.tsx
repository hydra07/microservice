import axios from '@/lib/axios';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
export default function useNotification() {
  const [status, setStatus] = useState<'connect' | 'disconnect'>('disconnect');
  const [notification, setNotification] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await axios.get(`/notification/${userId}?number=5`);
      if (res.data) {
        setNotification(res.data);
      }
    };
    fetchNotification();
    return () => {
      setNotification([]);
    };
  }, []);
  //init socket
  useEffect(() => {
    if (!userId) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
    socketRef.current = socket;
    socket.on('connect', () => {
      socket.emit('register', userId);
      console.log('Connected');
      setStatus('connect');
      socket.on('notification', (data: any) => {
        console.log('Notification received:', data);
        setNotification((prev) => [...prev, data]);
        console.log('Notification:', notification);
        toast(data.title);
      });
    });
    socket.on('disconnect', () => {
      setStatus('disconnect');
    });
    return () => {
      socket.disconnect();
      setStatus('disconnect');
    };
  }, [userId]);
  return {
    status,
    notification,
  };
}
