import useNotification from '@/hooks/useNotification';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Notification() {
  const { status, notification } = useNotification();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bell className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Notification</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NotificationItem() {
  return (
    <DropdownMenuItem>
      <div className="flex items-center space-x-2 p-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm">New comment</span>
          <span className="text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
      </div>
    </DropdownMenuItem>
  );
}
