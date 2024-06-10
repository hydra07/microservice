import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import axios from '@/lib/axios';
import { formatDate } from '@/utils/date.utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
async function fetching() {
  try {
    const res = await axios.get(`/api/post/`);
    if (res.data) return res.data;
  } catch (error) {}
  return [];
}

function CardPost({ post }: any) {
  const Link = dynamic(() => import('@/components/Link'));
  return (
    <Link href={`/post/${post._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {post.userId} upload {formatDate(post.createdAt)}
          </CardDescription>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <Image src={post.image} alt={post.title} fill />
            </AspectRatio>
          </CardContent>
          <CardFooter></CardFooter>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default async function CommentList() {
  const post = await fetching();
  // const AddPost = dynamic(
  //   () => import('./components/Post').then((module) => module.AddPost),
  //   { ssr: false },
  // );
  return (
    <>
      <div className="mx-10">
        {/* <AddPost /> */}
        <Separator className="my-6" />
        <div className="grid grid-cols-4 gap-4">
          {post.map((post: any) => (
            <CardPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
