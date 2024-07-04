import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Edit, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import CustomLink from '../CustomLink';

export default function MenuList() {
  const { user, status } = useAuth();
  return (
    <div className="flex flex-row space-x-6 font-serif">
      <div>
        <CustomLink className={buttonVariants({ variant: 'ghost' })} href="/">
          <span className="font-bold text-lg">Home</span>
        </CustomLink>
      </div>
      <div>
        <CustomLink className={buttonVariants({ variant: 'ghost' })} href="/product">
          <span className="font-bold text-lg">Product</span>
        </CustomLink>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CustomLink
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'font-bold text-lg',
                )}
                href="/post"
              >
                Post
              </CustomLink>
            </TooltipTrigger>
            <TooltipContent>
              <div className="rounded shadow-lg">
                <CustomLink
                  className={buttonVariants({ variant: 'ghost' })}
                  href="/post/add"
                >
                  Create a new post
                </CustomLink>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {user?.role === 'admin' && (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomLink
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'font-bold text-lg',
                  )}
                  href="/admin"
                >
                  Admin
                </CustomLink>
              </TooltipTrigger>
              <TooltipContent className="md:w-[300px]">
                <div className="flex flex-col rounded shadow-lg space-y-3 p-2">
                  <CustomLink
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-row space-x-2 self-start',
                    )}
                    href="/admin/product"
                  >
                    <ShoppingBag />
                    <span>Manage Product</span>
                  </CustomLink>
                  <CustomLink
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-row space-x-2 self-start',
                    )}
                    href="/admin/post"
                  >
                    <Edit />
                    <span>Manage Post</span>
                  </CustomLink>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
