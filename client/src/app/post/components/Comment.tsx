'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem } from '@/components/ui/form';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/string.utils';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { HeartIcon, MessageCircleIcon, SendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { CommentType } from 'Post';
import ImageResize from 'quill-image-resize-module-react';
import { forwardRef, RefObject } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { CommentRef } from '../post';
//Interface
interface CommentFormProps {
  commentId?: string;
  content: string;
  onChange: (content: string) => void;
}
interface RepplyProps {
  // commentItem: React.ReactNode;
  commentId: string;
  postId: string;
  isOpen: boolean;
  onToggleReply: () => void;
  // openForm: () => void;
}
interface CommentProps {
  comment: CommentType;
  level: number;
  children?: React.ReactNode;
  postId: string;
  isReplyOpen: boolean;
  onToggleReply: () => void;
}
// Register for Quill
Quill.register('modules/imageResize', ImageResize);

export function CommentForm({ content, onChange }: CommentFormProps) {
  const modules = {};
  return (
    <>
      <div className="comment">
        <ReactQuill
          style={{
            // height: '200px',
            width: '400px',
            resize: 'vertical',
          }}
          value={content}
          theme="bubble"
          onChange={onChange}
          modules={modules}
        />
      </div>
    </>
  );
}
interface AddCommentProps {
  postId: string;
  commentId?: string;
  onToggleReply?: () => void;
}
export const AddComment = forwardRef(
  (
    { postId, commentId, onToggleReply }: AddCommentProps,
    ref: RefObject<CommentRef> | any,
  ) => {
    const { data: session, status } = useSession();
    const form = useForm({
      defaultValues: {
        content: '',
        userId: '',
        postId: postId,
        commentId: null,
      },
    });
    const onSubmit = async (data: any) => {
      data.userId = session?.user.id;
      if (commentId) {
        data.commentId = commentId;
      }
      console.log(data);
      const res = await axios.post('/api/comment', data);
      if (res.status === 200) {
        form.reset();
        if (ref.current) {
          ref.current.refresh();
        }
        onToggleReply && onToggleReply();
      }
    };
    if (!session?.user.id) return null;
    else
      return (
        <>
          <div className="flex flex-row space-x-4 w-2/3 mb-5">
            <Avatar>
              <AvatarImage src={session?.user.avatar as string}></AvatarImage>
              <AvatarFallback>{'OK'}</AvatarFallback>
            </Avatar>

            <Card className="w-full">
              <Form {...form}>
                <form
                  className="flex flex-col"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-3/4">
                        <CommentForm
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end mb-4 mr-4">
                    <button type="submit">
                      <SendHorizontal className="w-6 h-6" />
                    </button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </>
      );
  },
);

export const ReplyComment = forwardRef(
  (
    {
      // commentItem,
      commentId,
      postId,
      isOpen,
      onToggleReply,
    }: RepplyProps,
    ref: RefObject<CommentRef> | any,
  ) => {
    return (
      <>
        {isOpen ? (
          <AddComment
            postId={postId}
            commentId={commentId}
            ref={ref}
            onToggleReply={onToggleReply}
          />
        ) : null}
      </>
    );
  },
);

const Comment = (
  {
    comment,
    level,
    children,
    postId,
    isReplyOpen,
    onToggleReply,
  }: CommentProps,
  ref: RefObject<CommentRef> | any,
) => {
  return (
    <>
      <div className="space-y-4 w-full">
        <div className={cn('flex items-start gap-4', `pl-[${56 * level}px]`)}>
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={comment.user.avatar} />
            <AvatarFallback>
              {getInitials(comment.user.username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{comment.user.username}</div>
              <small className="text-gray-500 dark:text-gray-400 ">
                {formatDistanceToNow(parseISO(comment.createdAt))}
              </small>
            </div>
            <div>
              <div
                className="comment"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggleReply}>
                <MessageCircleIcon className="w-4 h-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(`w-full pl-[${56 * level}px]`)}>
        <ReplyComment
          commentId={comment._id}
          postId={postId}
          isOpen={isReplyOpen}
          onToggleReply={onToggleReply}
          ref={ref}
        />
      </div>
      {children}
    </>
  );
};

export default forwardRef(Comment);
