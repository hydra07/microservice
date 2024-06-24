import useNotification from '@/hooks/useNotification';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Bell, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import InfiniteScroll from './ui/infinity-scoll';
import { ScrollArea } from './ui/scroll-area';

export default function Notification() {
  const { status, notification, checkNoti, next, state } = useNotification();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10" asChild>
        <Button
          className="relative"
          variant="ghost"
          size="icon"
          // onClick={() => checkNoti?.handleRemoveNoti()}
        >
          {checkNoti?.unread !== 0 && (
            <Badge
              className="absolute -top-3 -right-0 z-50 px-0.5 "
              variant="destructive"
            >
              {checkNoti?.unread}
            </Badge>
          )}
          <Bell className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Notification</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ScrollArea className="[&>div>div[style]]:!block w-full h-72">
            {Array.isArray(notification) &&
              notification.map((item) => {
                // console.log(item);
                return <NotificationItem notification={item} />;
              })}
            <div className="flex justify-center">
              {state && (
                <InfiniteScroll
                  hasMore={state.hasMore}
                  isLoading={state.loading}
                  next={next}
                  threshold={1}
                >
                  {state.hasMore && (
                    <Loader2 className="my-4 h-8 w-8 animate-spin" />
                  )}
                </InfiniteScroll>
              )}
            </div>
          </ScrollArea>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NotificationItem({ notification }: any) {
  return (
    <DropdownMenuItem key={notification._id}>
      <div className="flex items-center space-x-2 p-2">
        {/* <div className="w-8 h-8 bg-gray-300 rounded-full"></div> */}
        <div className="flex flex-col space-y-1">
          <span className="text-xl">{notification.title}</span>
          <span className="text-md text-gray-500">{notification.content}</span>
          <span className="text-sm">
            {formatDistanceToNow(parseISO(notification.createdAt))} ago
          </span>
        </div>
      </div>
    </DropdownMenuItem>
  );
}
