import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function useAuth() {
  const { data: session, status } = useSession();
}
