'use client';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  passHref?: boolean;
}
/**
 * Link này sinh ra với mục đích tận dụng tải trước, khi hover vào link sẽ tải trước trang, hạn chế tối đa việc tải khi không cần thiết
 */
export default ({ href, children, className, passHref }: LinkProps) => {
  const [prefetch, setPrefetch] = useState(false);
  // useEffect(() => {
  //   console.log('prefetch', prefetch);
  // }, [prefetch]);
  return (
    <Link
      className={className}
      href={href}
      prefetch={prefetch}
      onMouseEnter={() => setPrefetch(true)}
      passHref={passHref}
    >
      {children}
    </Link>
  );
};
