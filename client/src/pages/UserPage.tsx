import React, { useEffect } from 'react';
import { fetchUserData } from '@/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function UserPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  // const isLoading = useAppSelector(selectIsLoading);
  // const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div>
      <h1>User Page</h1>
      <p>{auth.user?.accessToken}</p>
      <p>{auth.user?.refreshToken}</p>
    </div>
  );
}