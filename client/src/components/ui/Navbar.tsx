'use client';

import { useState } from 'react';
import { loginDiscordAsync } from '@/lib/features/auth/authSlice';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector } from '../../lib/hooks';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Admins', href: '/admin', icon: LockClosedIcon },
  { name: 'Customers', href: '/user', icon: UserGroupIcon },
];

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const handleLogin = () => {
    dispatch(loginDiscordAsync());
    setShowModal(false);
  };

  return (
    <nav className="bg-indigo-400 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center" href="/">
              {/* <AcmeLogo className="h-8 w-8 text-white" /> */}
              <span className="ml-3 text-xl font-bold">Letcook</span>
            </Link>
            <div className="ml-8 flex space-x-4">
              {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700',
                      {
                        'bg-gray-900': pathname === link.href,
                      }
                    )}
                  >
                    <LinkIcon
                      className={clsx('h-5 w-5', {
                        'text-gray-400': pathname !== link.href,
                      })}
                    />
                    <span className="ml-2">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(true)}
            >
              Login with Discord
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-4">
              Login with Discord
            </h2>
            <button
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transition duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
            {auth.error && (
              <p className="text-red-500 text-center mt-4">{auth.error}</p>
            )}
            <button
              className="mt-4 w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;