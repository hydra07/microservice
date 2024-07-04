import { useSession } from 'next-auth/react';
export default function useAuth() {
  const { data: session, status } = useSession();
  if (!session || !session.user)
    return {
      user: null,
      status,
    };
  return {
    user: session.user,
    status,
  };
}
