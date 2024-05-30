import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/utils/date.utils';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

async function fetching() {
  const res = await axios.get('http://localhost:5000/api/post/');
  if (res.data) return res.data;
  return [];
}

function CardPost({ post }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          {post.userId} upload {formatDate(post.createdAt)}
        </CardDescription>
        <CardContent>
          <p className="text-lg">{post.content.substring(0, 200)}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <a
              className="flex flex-row space-x-4 text-primary hover:text-primary-dark"
              href={`/post/${post._id}`}
            >
              Read more
              <ArrowRight className="w-6 h-6" />
            </a>
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
export default async function CommentList() {
  const post = await fetching();
  return (
    <>
      <div className="mx-10">
        <div className="grid grid-cols-4 gap-4">
          {post.map((post: any) => (
            <CardPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
