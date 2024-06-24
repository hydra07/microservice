'use client';
import useComment from '@/hooks/useComment';
import axios from '@/lib/axios';
import { CommentType } from 'Post';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import Comment, { AddComment } from '../components/Comment';
import { CommentRef } from '../post';
interface CommentProps {
  id: string;
  level?: number;
}
/**
 * Comment tree component to render all comments in a tree structure
 * @param id
 * @returns
 */
export default function CommentTree({ id }: CommentProps) {
  const rendedComments: { [key: string]: boolean } = {};
  const [comments, setComments] = useState<CommentType[]>([]);
  const { toggleReply, isReplyOpen } = useComment();
  const commentRef = useRef<CommentRef | any>({ refresh: () => {} });

  const traverseComments = (currentComments: CommentType[], level: number) => {
    console.log('traverseComments', currentComments);
    const result: ReactNode[] = [];
    for (const comment of currentComments) {
      const { _id, content, left, right } = comment;
      if (rendedComments[_id]) {
        continue;
      }
      rendedComments[_id] = true;
      console.log('rendering comment', comment._id);
      result.push(
        <div key={comment._id}>
          <Comment
            comment={comment}
            level={level}
            postId={id}
            isReplyOpen={isReplyOpen(_id)}
            onToggleReply={() => toggleReply(_id)}
            ref={commentRef}
          >
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

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/comment/${id}`);
      const comments = res.data;
      setComments(comments.sort((a: any, b: any) => a.left - b.left));
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    fetchComments();
    return () => {
      setComments([]);
    };
  }, [id]);

  useEffect(() => {
    fetchComments();
    if (!commentRef.current) return;
    commentRef.current.refresh = fetchComments;
  }, [commentRef]);

  if (!comments) return null;
  return (
    <div className="space-y-4">
      <AddComment postId={id} ref={commentRef} />
      {traverseComments(comments, 0)}
    </div>
  );
}
