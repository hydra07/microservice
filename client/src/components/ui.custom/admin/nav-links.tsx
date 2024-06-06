'use client';

import {
  UserGroupIcon,
  HomeIcon,
  TagIcon,
  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  {
    name: 'Product Categories',
    href: '/admin/productCategory',
    icon: TagIcon,
  },
  {
    name: "Product",
    href: "/admin/product",
    icon: TagIcon,
  }
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-indigo-100 p-3 text-sm font-medium text-indigo-800 hover:bg-indigo-200 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-indigo-200 text-indigo-800': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}