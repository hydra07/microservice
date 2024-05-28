import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { CircleUserRound } from 'lucide-react';
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
export default async function CommentList({ id }: CommentProps) {
  const comments = await fetchingComment(id);
  return (
    <>
      {comments.map((comment: any, index: any) => (
        <Comment key={index} comment={comment} />
      ))}
    </>
  );
}

const Comment = ({ comment }: any) => {
  return (
    <div className="bg-slate-500 rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-row space-x-4">
        <CircleUserRound className="w-8 h-8" />
        <h4 className="text-md font-bold mt-1">{comment.userId}</h4>
      </div>
      <h1 className="text-xl font-bold mb-2">{comment.title}</h1>
      <div className="text-gray-600 mb-2 flex flex-col">
        {/* <span>By User {comment.userId}</span> */}
        <p className="">{comment.content}</p>
        <span>{formatDistanceToNow(parseISO(comment.createdAt))}</span>
      </div>
    </div>
  );
};
