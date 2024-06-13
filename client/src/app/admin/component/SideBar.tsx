'use client';
import Menu from '@/components/ui.custom/admin/menu';
import { Button } from '@/components/ui/button';
import { useSidebarToggle } from '@/hooks/useSideBarToggle';
import useSize from '@/hooks/useSize';
import { cn } from '@/lib/utils';
import { ChevronLeft, CookingPot } from 'lucide-react';
import Link from 'next/link';
import { useStore } from 'zustand';
export default function SideBar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  const { size, setSize } = useSize({ name: 'header' });
  return (
    <aside
      className={cn(
        `fixed top-[${size}] left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300`,
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72',
      )}
    >
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0',
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <CookingPot className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                sidebar?.isOpen === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100',
              )}
            >
              LetCook
            </h1>
          </Link>
        </Button>
        <SidebarButton
          isOpen={sidebar?.isOpen}
          setIsOpen={sidebar?.setIsOpen}
        />
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}

const SidebarButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) => {
  return (
    // <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20 bg-white dark:bg-primary-foreground">
    <button
      onClick={() => setIsOpen?.()}
      className='outline-none focus:outline-none'
    // className="rounded-md w-full h-8"
    // variant="outline"
    // size="icon"
    >
      <ChevronLeft
        className={cn(
          'h-4 w-4 transition-transform ease-in-out duration-700',
          isOpen === false ? 'rotate-180' : 'rotate-0',
        )}
      />
    </button >
    // </div>
  );
};
