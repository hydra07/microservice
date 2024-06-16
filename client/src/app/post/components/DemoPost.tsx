'use client';

import Loading from '@/components/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import axios from '@/lib/axios';
import { formatISODateToLongDate } from '@/utils/date.utils';
import { getInitials } from '@/utils/string.utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Post({ id, children }: any) {
  const [post, setPost] = useState<any>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    const fecthing = async () => {
      try {
        const res = await axios.get(`/api/post/${id}`);
        console.log(res.data);
        setPost(res.data);
        setIsloading(true);
      } catch (error) {}
    };
    fecthing();
    // console.log(post);
    return () => {
      setPost(null);
    };
  }, []);

  if (!isLoading) {
    return <Loading />;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="grid grid-cols-[300px_1fr] gap-8 py-12 px-4 md:px-6 lg:px-8">
      <div className="sticky top-16 self-start space-y-6">
        {/* <SideBar /> */}
      </div>
      <div>
        <BreadcrumbPost title={post.title} />
        <article className="prose prose-gray dark:prose-invert space-y-4">
          <img
            src={post.image}
            alt="Cover image"
            width={1150}
            height={340}
            className="aspect-video overflow-hidden rounded-lg object-cover"
          />
          <div className="space-y-2 not-prose">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>
                    {getInitials(post.user.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {post.user.username}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatISODateToLongDate(post.createdAt)}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
        <Separator className="my-8" />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Comments</h2>
          <div className="w-full md:w-3/4">{children}</div>
        </div>
      </div>
    </div>
  );
}
function BreadcrumbPost({ title }: { title: string }) {
  // const Link = dynamic(() => import('@/components/Link'));
  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-xl">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/post" className="text-xl">
              Post
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
function SideBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Another Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Discover the hidden gems of the city with our curated guide to the
          best local spots. From cozy cafes to vibrant street art, unlock the
          true essence of urban living.
        </p>
      </CardContent>
      <CardFooter>
        <Link href="#" className="text-sm font-medium" prefetch={false}>
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
