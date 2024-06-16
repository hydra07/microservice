'use client';

import { useSession } from 'next-auth/react';
import FormPost from '../components/PostForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default () => {
  // const FormPost = dynamic(() => import('../components/PostForm'), {
  //   ssr: false,
  // });
  const { data: session, status } = useSession();
  if (!session?.user) return null;
  return (
    <div className="mx-10">
      <FormPost user={session.user} />
      <ToastContainer />
    </div>
  );
};
