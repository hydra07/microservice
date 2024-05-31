import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const _user = session?.user;
    console.log('session', user);
    if (_user) {
      setUser(_user);
    }
    // return () => {
    //   setUser(null);
    // };
  }, []);
  return { user, status };
}
