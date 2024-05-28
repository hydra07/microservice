'use client';

import { useEffect, useState } from 'react';
import ModeButton from './ModeButton';

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full py-[11px] fixed top-0 left-0 z-50 bg-black border-b border-gray-800 shadow-lg
      ${isAtTop ? 'bg-opacity-20' : 'bg-opacity-70'}
      `}
    >
      <div className="w-full px-14">
        <div className="flex justify-between gap-8">
          <ModeButton />
        </div>
      </div>
    </header>
  );
}
