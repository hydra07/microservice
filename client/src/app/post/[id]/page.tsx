import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import SideBar from './SideBar';
const Comment = dynamic(() => import('./Comment'));
const Post = dynamic(() => import('./Post'));
export default async ({ params }: { params: { id: string } }) => {
  // const post = await fetchingPost(params.id);
  // console.log(post);
  return (
    <>
      <div className="container">
        <div className="flex flex-row">
          <Post id={params.id}>
            <Comment id={params.id} />
          </Post>

          <SideBar />
        </div>
      </div>
    </>
  );
};
