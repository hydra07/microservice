'use client';
import { useSidebarToggle } from '@/hooks/useSideBarToggle';
import { cn } from '@/lib/utils';
import { useStore } from 'zustand';
import SideBar from './component/SideBar';
export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  return (
    <>
      <SideBar />
      <main
        className={cn(
          ' transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
      </main>
    </>
  );
};

// export default isAuth(AdminLayout);
