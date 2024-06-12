import Link from '@/components/Link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import axios from '@/lib/axios';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

export const createColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
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
      return <Checkbox checked={isActivate} onCheckedChange={async () => {
        const res = await axios.put(`/api/post/${post._id}?isActivate=${!isActivate}`)
        const newPost = await res.data;
        setIsActivate(newPost.isActivate);
      }} />;
    },
  },
  {
    accessorKey: '_id',
    header: 'Preview',
    cell: ({ getValue }) => {
      return <Link
        className="hover:text-gray-500"
        href={`/post/${getValue() as string}`}>Preview</Link>;
    },
  },
];
