'use client';

import UserWrapper from '@/components/UserWrapper';
import useAuth from '@/hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormPost from '../components/PostForm';
export default () => {
  const { user } = useAuth();
  return (
    <UserWrapper>
      <div className="mx-10">
        <FormPost user={user} />
        <ToastContainer />
      </div>
    </UserWrapper>
  );
};
