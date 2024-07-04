// components/NavigationEvents.tsx
"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Spinner } from './ui/spinner';

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 300);
    };

    handleStart();
    
    return () => {
      handleComplete();
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <Spinner size="large" />
    </div>
  );
}