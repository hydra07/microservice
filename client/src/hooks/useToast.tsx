// hooks/useToast.ts
import { useRef } from 'react';
import { toast, Id } from 'react-toastify';

export const useToast = () => {
  const toastId = useRef<Id | null>(null);

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    if (!toast.isActive(toastId.current as any)) {
      toastId.current = toast[type](message);
    }
  };

  return { showToast };
};