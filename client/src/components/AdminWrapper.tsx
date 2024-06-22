import useAuth from '@/hooks/useAuth';
import Loading from './Loading';
import ErrorAccessDenied from './error/ErrorAccessDenied';

const AdminWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user, status } = useAuth();
  if (status === 'loading') return <Loading />;
  if (!user)
    return (
      <ErrorAccessDenied
        status={status}
        message="You must be logged in to access this page."
      />
    );
  if (user.role !== 'admin')
    return (
      <ErrorAccessDenied
        status={status}
        message="You must be an admin to access this page."
      />
    );
  return <>{children}</>;
};

export default AdminWrapper;
