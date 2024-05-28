import dynamic from 'next/dynamic';
const Comment = dynamic(() => import('../Comment'));
const Post = dynamic(() => import('../Post'));
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
