'use client';
import axios from '@/lib/axios';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// import { ReplyComment } from '../AddComment';
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

/**
 * Comment tree component to render all comments in a tree structure
 * @param id
 * @returns
 */
export default async function CommentTree({ id }: CommentProps) {
  const comments = await fetchingComment(id);
  const rendedComments: { [key: string]: boolean } = {};
  const Comment = dynamic(() => import('../components/Comment'), {
    ssr: false,
  });
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
          <Comment comment={comment} level={level} postId={id}>
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
