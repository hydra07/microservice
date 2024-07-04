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

export default function MenuList() {
  const { user, status } = useAuth();
  return (
    <div className="flex flex-row space-x-6">
      <div>
        <Link className={buttonVariants({ variant: 'ghost' })} href="/">
          <span className="font-bold text-lg">Home</span>
        </Link>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'font-bold text-lg',
                )}
                href="/post"
              >
                Post
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <div className="rounded shadow-lg">
                <Link
                  className={buttonVariants({ variant: 'ghost' })}
                  href="/post/add"
                >
                  Create a new post
                </Link>
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
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'font-bold text-lg',
                  )}
                  href="/admin"
                >
                  Admin
                </Link>
              </TooltipTrigger>
              <TooltipContent className="md:w-[300px]">
                <div className="flex flex-col rounded shadow-lg space-y-3 p-2">
                  <Link
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-row space-x-2 self-start',
                    )}
                    href="/admin/product"
                  >
                    <ShoppingBag />
                    <span>Manage Product</span>
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-row space-x-2 self-start',
                    )}
                    href="/admin/post"
                  >
                    <Edit />
                    <span>Manage Post</span>
                  </Link>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
