import useAuth from '@/hooks/useAuth';
import { useAuthFormToggle } from '@/hooks/useAuthFormToggle';
import { useEffect } from 'react';
import Loading from './Loading';
import ErrorAccessDenied from './error/ErrorAccessDenied';

const UserWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { user, status } = useAuth();
  const { setIsOpen } = useAuthFormToggle();
  useEffect(() => {
    if (!user) {
      setIsOpen(true);
    }
  }, [user, setIsOpen]);
  if (status === 'loading') return <Loading />;
  if (!user)
    return (
      <ErrorAccessDenied
        status={status}
        message="You must be logged in to access this page."
      />
    );
  return <>{children}</>;
};

export default UserWrapper;
