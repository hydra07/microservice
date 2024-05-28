import dynamic from 'next/dynamic';
const Comment = dynamic(() => import('@/components/post/Comment'));
const Post = dynamic(() => import('@/components/post/Post'));
export default async ({ params }: { params: { id: string } }) => {
  // const post = await fetchingPost(params.id);
  // console.log(post);
  return (
    <>
      <Post id={params.id}>
        <Comment id={params.id} />
      </Post>
    </>
  );
};
