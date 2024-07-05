import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Edit, ShoppingBag, Home, FileText, PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ReactNode } from 'react';
import { spaceMono } from '@/components/ui.custom/fonts';
export default function MenuList() {
  const { user } = useAuth();

  return (
    <div className={`${spaceMono.className} flex flex-row space-x-6 items-center`}>
      <MenuItem href="/" label="Home" icon={<Home className="w-5 h-5 mr-2" />} />

      <MenuItem href="/product" label="Product" icon={<ShoppingBag className="w-5 h-5 mr-2" />} />

      <TooltipProvider>
        <TooltipMenuItem 
          href="/post" 
          label="Post" 
          icon={<FileText className="w-5 h-5 mr-2" />} 
          tooltipContent="Create a new post" 
          tooltipHref="/post/add" 
        />
      </TooltipProvider>

      <MenuItem href="/orderPurchase" label="Order" icon={<PackageSearch className="w-5 h-5 mr-2" />} />

      {user?.role === 'admin' && (
        <TooltipProvider>
          <TooltipMenuItem
            href="/admin"
            label="Admin"
            icon={<Edit className="w-5 h-5 mr-2" />}
            tooltipContent={
              <div className="flex flex-col rounded shadow-lg space-y-3 p-2 bg-white dark:bg-gray-800">
                <TooltipLink href="/admin/product" icon={<ShoppingBag />} label="Manage Product" />
                <TooltipLink href="/admin/post" icon={<Edit />} label="Manage Post" />
              </div>
            }
          />
        </TooltipProvider>
      )}
    </div>
  );
}

interface MenuItemProps {
  href: string;
  label: string;
  icon: ReactNode;
}

function MenuItem({ href, label, icon }: MenuItemProps) {
  return (
    <div className="relative group">
      <Link className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center transition-all duration-300 hover:text-green-500')} href={href}>
        {icon}
        <span className="font-bold text-lg">{label}</span>
      </Link>
      <div className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
}

interface TooltipMenuItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  tooltipContent: ReactNode;
  tooltipHref?: string;
}

function TooltipMenuItem({ href, label, icon, tooltipContent, tooltipHref }: TooltipMenuItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative group">
          <Link className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center transition-all duration-300 hover:text-green-500')} href={href}>
            {icon}
            <span className="font-bold text-lg">{label}</span>
          </Link>
          <div className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="rounded shadow-lg bg-white dark:bg-gray-800">
          {tooltipHref ? (
            <Link className={cn(buttonVariants({ variant: 'ghost' }), 'block p-2')} href={tooltipHref}>
              {tooltipContent}
            </Link>
          ) : (
            tooltipContent
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

interface TooltipLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

function TooltipLink({ href, icon, label }: TooltipLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center justify-start space-x-2 p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded')} href={href}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
