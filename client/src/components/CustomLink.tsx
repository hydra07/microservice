// components/CustomLink.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function CustomLink({ href, children, className }: CustomLinkProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}