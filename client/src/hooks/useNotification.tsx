import { axiosWithAuth } from '@/lib/axios';
import { useCallback, useEffect, useRef, useState } from 'react';
// import { toast } from 'react-toastify';
import { useToast } from '@/components/ui/use-toast';
import { io, Socket } from 'socket.io-client';
import useAuth from './useAuth';
export interface Notification {
  _id: string;
  title: string;
  content: string;
}

export default function useNotification() {
  const [status, setStatus] = useState<'connect' | 'disconnect'>('disconnect');
  const [notification, setNotification] = useState<Notification[]>([]);
  const [unread, setUnread] = useState<number>(0);
  const socketRef = useRef<Socket | null>(null);
  const { user, status: authStatus } = useAuth();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const state = {
    hasMore,
    loading,
    page,
  };

  const checkNoti = {
    unread,
    handleRemoveNoti: () => {
      console.log('remove noti');
      setUnread(0);
    },
  };

  const { toast } = useToast();

  if (authStatus === 'unauthenticated' && user) {
    setStatus('disconnect');
    setNotification([]);
    return {
      status: 'disconnect',
      notification,
    };
  }

  const next = useCallback(async () => {
    if (authStatus === 'unauthenticated') return;
    if (!user || !user.accessToken) return;
    setLoading(true);
    setTimeout(async () => {
      setUnread(0);
      const res = await axiosWithAuth(user.accessToken).get(
        `/api/notification?take=3&skip=${3 * page}`,
      );
      const data = res.data;
      setNotification((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
      if (data.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
    }, 1000);
  }, [page]);

  // useEffect(() => {
  //   const fetchNotification = async () => {
  //     if (authStatus === 'authenticated' && user?.id && user?.accessToken) {
  //       const res = await axiosWithAuth(user.accessToken).get(
  //         `/api/notification?number=5`,
  //       );
  //       if (res.data) {
  //         setNotification(res.data);
  //       }
  //     }
  //   };
  //   fetchNotification();

  //   return () => {
  //     setNotification([]);
  //   };
  // }, [authStatus]);
  //init socket
  useEffect(() => {
    if (authStatus === 'unauthenticated') return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
    socketRef.current = socket;
    socket.on('connect', () => {
      socket.emit('register', user?.id);
      console.log('Connected');
      setStatus('connect');
      socket.on('notification', (data: any) => {
        console.log('Notification received:', data);
        setNotification((prev) => [data, ...prev]);
        setUnread((prev) => prev + 1);
        console.log('Notification:', notification);
        // toast(data.title);
        toast({
          title: data.title,
          description: data.content,
          variant: 'default',
        });
      });
    });
    socket.on('disconnect', () => {
      setStatus('disconnect');
    });
    return () => {
      socket.disconnect();
      setStatus('disconnect');
    };
  }, [user, authStatus]);
  console.log('Notification:', notification);
  return {
    status,
    notification,
    checkNoti,
    next,
    state,
  };
}
