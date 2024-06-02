import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from '@/lib/axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ReactNode } from 'react';
interface CommentProps {
  id: string;
  level?: number;
}
async function fetchingComment(id: string) {
  try {
    const res = await axios.get(`/api/comment/${id}`);
    const comments = res.data;
    return comments.sort((a: any, b: any) => a.left - b.left);
  } catch (error) {
    console.error(error);
  }
}
const Comment = ({ comment, level, children }: any) => {
  return (
    <div style={{ marginLeft: `${level * 40}px` }}>
      <div className="flex flex-row space-x-3 mb-4">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden mt-3">
          <AvatarImage
            src="https://source.unsplash.com/random"
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
          {/* <CircleUserRound className="w-8 h-8" /> */}
        </Avatar>

        <div className="flex flex-col max-w-72">
          <div className="bg-opacity-65 bg-secondary p-2 rounded-md px-4">
            <div>
              <span className="text-lg font-bold">{comment.userId}</span>
            </div>
            <div>
              <span className="text-lg">{comment.content}</span>
            </div>
          </div>
          <div>
            <span>{formatDistanceToNow(parseISO(comment.createdAt))}</span>
          </div>
        </div>
        {/* <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex flex-row space-x-5">
              <p className="text-lg font-bold">{comment.userId}</p>
            </CardTitle>
            <CardContent className="-ml-4 pt-4">
              <span className="text-lg">{comment.content}</span>
            </CardContent>
            <CardDescription>
              <span>{formatDistanceToNow(parseISO(comment.createdAt))}</span>
              <span className="text-sm text-gray-500">{`[${comment.left},${comment.right}],${level}`}</span>
            </CardDescription>
          </CardHeader>
        </Card> */}
      </div>

      {children}
    </div>
  );
};
export default async function CommentTree({ id }: CommentProps) {
  const comments = await fetchingComment(id);
  const rendedComments: { [key: string]: boolean } = {};

  const traverseComments = (currentComments: any[], level: number) => {
    const result: ReactNode[] = [];
    for (const comment of currentComments) {
      const { _id, content, left, right } = comment;
      if (rendedComments[_id]) {
        continue;
      }
      rendedComments[_id] = true;
      result.push(
        <div>
          <Comment comment={comment} level={level}>
            {traverseComments(
              currentComments.filter((c) => c.left > left && c.right < right),
              level + 1,
            )}
          </Comment>
        </div>,
      );
    }
    return result;
  };
  return <div>{traverseComments(comments, 0)}</div>;
}

// const comments: any[] = [
//   {
//     _id: '6655fc5d174382ffd7f1700e',
//     content: 'This is a test comment',
//     userId: 'testUserId',
//     createdAt: '2024-05-28T15:46:37.647Z',
//     left: 1,
//     right: 10, // Root comment encompassing a subtree
//   },
//   {
//     _id: '6655fc68174382ffd7f1700f',
//     content: 'This is a test comment2',
//     userId: 'testUserId2',
//     createdAt: '2024-05-28T15:46:48.414Z',
//     left: 2,
//     right: 3, // Leaf comment
//   },
//   {
//     _id: '6655fc86174382ffd7f17011',
//     content: 'This is a test comment3',
//     userId: 'testUserId3',
//     createdAt: '2024-05-28T15:47:18.331Z',
//     left: 4,
//     right: 9, // Comment with children
//   },
//   {
//     _id: '6655fc77174382ffd7f17010',
//     content: 'This is a test comment4',
//     userId: 'testUserId4',
//     createdAt: '2024-05-28T15:47:03.246Z',
//     left: 5,
//     right: 6, // Leaf comment within a subtree
//   },
//   {
//     _id: '6655fc8a174382ffd7f17012',
//     content: 'This is a test comment5',
//     userId: 'testUserId5',
//     createdAt: '2024-05-28T15:47:25.331Z',
//     left: 7,
//     right: 8, // Leaf comment within a subtree
//   },
//   {
//     _id: '6655fcae174382ffd7f17013',
//     content: 'This is a test comment6',
//     userId: 'testUserId6',
//     createdAt: '2024-05-28T15:47:48.331Z',
//     left: 11,
//     right: 12, // Root comment not encompassing others
//   },
//   {
//     _id: '6655fcbf174382ffd7f17014',
//     content: 'This is a test comment7',
//     userId: 'testUserId7',
//     createdAt: '2024-05-28T15:48:01.331Z',
//     left: 13,
//     right: 16, // Root comment with a subtree
//   },
//   {
//     _id: '6655fccf174382ffd7f17015',
//     content: 'This is a test comment8',
//     userId: 'testUserId8',
//     createdAt: '2024-05-28T15:48:18.331Z',
//     left: 14,
//     right: 15, // Leaf comment within another root subtree
//   },
// ];
