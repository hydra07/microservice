import axios from 'axios';
interface PostProps {
  id: string;
  children?: React.ReactNode;
}
async function fetchingPost(id: string) {
  try {
    const res = await axios.get(`http://localhost:5000/api/post/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
export default async function Post({ id, children }: PostProps) {
  const post = await fetchingPost(id);
  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <h1>{post.userId}</h1>
        <p>{post.content}</p>
        <h2>{post.createdAt}</h2>

        {children}
      </div>
    </>
  );
}
