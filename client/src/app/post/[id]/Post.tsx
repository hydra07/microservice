import { Separator } from '@/components/ui/separator';
import axios from '@/lib/axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import dynamic from 'next/dynamic';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';

interface PostProps {
  id: string;
  children?: React.ReactNode;
}

async function fetchingPost(id: string) {
  try {
    const res = await axios.get(`/api/post/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

function BreadcrumbPost({ title }: { title: string }) {
  // const Link = dynamic(() => import('@/components/Link'));
  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/post">Post</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default async function Post({ id, children }: PostProps) {
  const post = await fetchingPost(id);
  const AddComment = dynamic(
    () => import('../components/Comment').then((module) => module.AddComment),
    {
      ssr: false,
    },
  );
  return (
    <>
      <div className="container mx-auto p-6">
        <BreadcrumbPost title={post.title} />
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-600 mb-2 flex flex-col">
            <span>By User {post.userId}</span>
            <span>{formatDistanceToNow(parseISO(post.createdAt))}</span>
          </div>
          {/* <p className="text-lg">{post.content}</p> */}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <Separator className="my-6" />
        <AddComment postId={id as string} />
        <div>{children}</div>
      </div>
    </>
  );
}
