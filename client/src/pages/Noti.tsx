// import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
export default function Test() {
  const [notification, setNotification] = useState<any[]>([]);
  // const { toast } = useToast();

  // const showToast = (data: any) => {
  //   toast({
  //     title: data.title,
  //     description: data.content,

  //     // action: (
  //     //   <ToastAction altText="Goto schedule to undo"></ToastAction>
  //     // ),
  //   });
  // };
  useEffect(() => {
    const socket = io('ws://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected');
      socket.on('notification', (data: any) => {
        console.log('Notification received:', data);
        setNotification((prev) => [...prev, data]);
        toast(data.title, {
          // delay: 5000,
          autoClose: 5000,
          position: 'bottom-right',
          hideProgressBar: false,
        });
        // showToast(data);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Test</h1>
      <p className="mb-4">This is a test page.</p>
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="grid grid-cols-1 gap-4">
        {notification.map((n, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <h2 className="text-lg font-bold mb-2">{n.title}</h2>
            <p className="mb-2">{n.content}</p>
            <p className="text-sm text-gray-500 mb-2">
              Created At: {new Date(n.createAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">User ID: {n.userId}</p>
            <p className="text-sm text-gray-500">ID: {n._id}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
