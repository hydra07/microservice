import axios from 'axios';
interface CommentProps {
  id: string;
}
async function fetchingComment(id: string) {
  try {
    const res = await axios.get(`http://localhost:5000/api/comment/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
export default async function Comment({ id }: CommentProps) {
  const comments = await fetchingComment(id);
  return (
    <>
      {comments.map((comment: any) => (
        <div key={comment._id}>
          <h1>{comment.title}</h1>
          <h1>{comment.userId}</h1>
          <p>{comment.content}</p>
          <h2>{comment.createdAt}</h2>
        </div>
      ))}
    </>
  );
}
