'use client';

import PagePagination from '@/components/ui.custom/page-pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import axios from '@/lib/axios';
import { formatISODateToLongDate } from '@/utils/date.utils';
import { getInitials } from '@/utils/string.utils';
import Link from 'next/link';
import { PostType } from 'Post';
import { useEffect, useState } from 'react';

export default function ListPost({
  tag,
  page,
}: {
  tag?: string | null;
  page: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const take = 6;
  useEffect(() => {
    const fetching = async () => {
      try {
        const queryParams = [];
        if (tag) {
          queryParams.push(`tag=${tag}`);
        }
        if (page) {
          queryParams.push(`take=${take}`);
          queryParams.push(`skip=${(page - 1) * take}`);
        }
        const queryString =
          queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const res = await axios.get(`/api/post/${queryString}`);
        setPosts(res.data.post);
        setTotal(res.data.total);
        setIsLoading(false);
      } catch (error) {}
    };
    fetching();
    return () => {
      setPosts([]);
    };
  }, [tag, page]);
  // console.log(total, page);
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
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
      <Separator className="my-6" />
      <PagePagination
        page={page}
        totalPage={Math.ceil(total / take)}
        href={`/post${tag ? `?tag=${tag}` : ''}`}
      />
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
      passHref
      // prefetch={false}
      className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800"
    >
      <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800">
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
                <AvatarFallback>
                  {getInitials(post.user.username)}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium">
                {post.user.username}
              </span>
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatISODateToLongDate(post.createdAt)}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-bold transition-colors duration-300 hover:text-primary-500 dark:hover:text-primary-400">
            {post.title}
          </h3>

          <p className="mb-4 text-gray-500 dark:text-gray-400">
            Learn the essential steps to create a thriving blog and build a
            loyal audience.
          </p>
          <Tags tags={post.tags} />
        </div>
      </div>
    </Link>
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
export function Tags({ tags }: { tags?: { name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags &&
        tags.slice(0, 3).map((tag, index) => (
          <div key={tag.name}>
            <Link
              href={`/post?tag=${tag.name}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              prefetch={false}
            >
              {tag.name}
            </Link>
          </div>
        ))}
    </div>
  );
}
