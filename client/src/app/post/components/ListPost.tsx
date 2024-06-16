'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import axios from '@/lib/axios';
import { formatISODateToLongDate } from '@/utils/date.utils';
import { getInitials } from '@/utils/string.utils';
import Link from 'next/link';
import { PostType } from 'Post';
import { useEffect, useState } from 'react';

export default function ListPost({ tag }: { tag?: string | null }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get(`/api/post/all${tag ? `?tag=${tag}` : ''}`);
        setPosts(res.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetching();
    return () => {
      setPosts([]);
    };
  }, [tag]);
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <BreadcrumbPost />
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((_, i) => (
            <PostSkeleton index={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard post={post} />
          ))}
        </div>
      )}
      <Separator className="my-6" />
      <PostPaganation />
    </div>
  );
}

export function PostSkeleton({ index }: any) {
  return (
    <div
      key={index}
      className="rounded-lg bg-white shadow-md transition-transform duration-300 dark:bg-gray-800"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="ml-2 h-4 w-24" />
        </div>
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

export function PostCard({ post }: { post: PostType }) {
  return (
    <Link
      href={`/post/${post._id}`}
      // prefetch={false}
      key={post._id}
      className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={post.image}
          alt="Blog Post Image"
          width={640}
          height={360}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center">
          <Link href="#" className="mr-2 flex items-center" prefetch={false}>
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{getInitials(post.user.username)}</AvatarFallback>
            </Avatar>
            <span className="ml-2 text-sm font-medium">
              {post.user.username}
            </span>
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {/* May 15, 2023 */}
            {formatISODateToLongDate(post.createdAt)}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 hover:text-primary-500 dark:hover:text-primary-400">
          {post.title}
        </h3>

        <p className="mb-4 text-gray-500 dark:text-gray-400">
          Learn the essential steps to create a thriving blog and build a loyal
          audience.
        </p>
        <Tags tags={post.tags} />
      </div>
    </Link>
  );
}

export function PostPaganation() {
  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export function BreadcrumbPost() {
  return (
    <div className="py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xl" asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xl" asChild>
              <Link href="/post">Post</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// const tags = [
//   {
//     href: "blogging",
//     label: "Blogging",
//   },
//   {
//     href: "content-creation",
//     label: "Content Creation",
//   },
//   {
//     href: "marketing",
//     label: "Marketing",
//   },
// ];

export function Tags({ tags }: { tags?: { name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags &&
        tags.map((tag) => (
          <Link
            href={`/post?tag=${tag.name.toLowerCase().replace(/\s+/g, '')}`}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            prefetch={false}
          >
            {tag.name}
          </Link>
        ))}
    </div>
  );
}
