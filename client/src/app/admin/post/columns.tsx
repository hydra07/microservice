import Link from '@/components/Link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axios from '@/lib/axios';
import { ColumnDef } from '@tanstack/react-table';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import EditTags from './EditTags';

export const createColumns = (): ColumnDef<any>[] => [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditTags postId={post._id} currentTags={post.tags} />
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: 'Author',
    cell: ({ getValue }) => {
      const user = getValue();
      return (
        <div className="flex flex-col space-y-1">
          <Avatar>
            <AvatarImage src={(user as any)?.avatar as string}></AvatarImage>
            <AvatarFallback>{(user as any)?.username}</AvatarFallback>
          </Avatar>
          <span>{(user as any)?.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Create',
    cell: ({ getValue }) => {
      return <span>{new Date(getValue() as any).toLocaleDateString()} </span>;
    },
  },
  {
    accessorKey: 'isActivate',
    header: 'Published',
    cell: ({ row }) => {
      const post = row.original;
      const [isActivate, setIsActivate] = useState(post.isActivate);
      console.log(post);
      return (
        <Checkbox
          checked={isActivate}
          onCheckedChange={async () => {
            const res = await axios.put(
              `/api/post/${post._id}?isActivate=${!isActivate}`,
            );
            const newPost = await res.data;
            setIsActivate(newPost.isActivate);
          }}
        />
      );
    },
  },
  {
    accessorKey: '_id',
    header: 'Preview',
    cell: ({ getValue }) => {
      return (
        <Link
          className="hover:text-gray-500"
          href={`/post/${getValue() as string}`}
        >
          Preview
        </Link>
      );
    },
  },
];
