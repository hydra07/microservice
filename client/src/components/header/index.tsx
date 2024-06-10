
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
// import AuthButton from './AuthButton';
const AuthButton = dynamic(() => import('./AuthButton'), { ssr: false });
const ModeButton = dynamic(() => import('./ModeButton'));
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
      className={`w-full py-[11px] fixed top-0 left-0 z-50 bg-black shadow-lg

      ${isAtTop ? 'bg-opacity-20' : 'bg-opacity-70'}
      `}
    >
      <div className="w-full px-14">
        <div className="flex justify-between gap-8">
          <div className="w-8"></div>
          <div className="flex flex-row space-x-4">
            <AuthButton />
            <ModeButton />
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
    </header>
  );
}
