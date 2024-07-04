// components/NavigationEvents.tsx
"use client";

import { useState, useEffect } from 'react';
import { Spinner } from './ui/spinner';

export default function NavigationEvents() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    window.addEventListener('navigationStart', handleStart);
    window.addEventListener('navigationComplete', handleComplete);

    return () => {
      window.removeEventListener('navigationStart', handleStart);
      window.removeEventListener('navigationComplete', handleComplete);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <Spinner size="large" />
    </div>
  );
}