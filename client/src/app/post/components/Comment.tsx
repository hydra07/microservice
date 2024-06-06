'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem } from '@/components/ui/form';
import axios from '@/lib/axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { SendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import ImageResize from 'quill-image-resize-module-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
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
  // openForm: () => void;
}
// Register for Quill
Quill.register('modules/imageResize', ImageResize);

export default function Comment({ comment, level, children, postId }: any) {
  // const onReply = () => {};
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const toggleReply = () => {
    setIsOpenReply(!isOpenReply);
  };
  return (
    <div style={{ marginLeft: `${level * 40}px` }}>
      <div className="flex flex-row space-x-3 mb-4">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden mt-3">
          <AvatarImage
            // src="https://source.unsplash.com/random"
            src={comment.user.avatar}
            className="object-cover"
          />
          <AvatarFallback>{comment.user.username}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-w-72">
          <div className="bg-opacity-65 bg-secondary p-2 rounded-md px-4">
            <div>
              <span className="text-lg font-bold">{comment.user.username}</span>
            </div>
            <div
              className="comment"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <span>{formatDistanceToNow(parseISO(comment.createdAt))}</span>
            <button
              className="text-primary text-black hover:text-slate-600 dark:text-white dark:hover:text-slate-600"
              onClick={toggleReply}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      <ReplyComment
        commentId={comment._id}
        postId={postId}
        isOpen={isOpenReply}
      />
      {children}
    </div>
  );
}

export function CommentForm({ content, onChange }: CommentFormProps) {
  const modules = {};

  return (
    <>
      <div className="comment">
        <ReactQuill
          style={{
            // height: '200px',
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

export function AddComment({
  postId,
  commentId,
}: {
  postId: string;
  commentId?: string;
}) {
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
}

export function ReplyComment({
  // commentItem,
  commentId,
  postId,
  isOpen,
}: RepplyProps) {
  return (
    <>{isOpen ? <AddComment postId={postId} commentId={commentId} /> : null}</>
  );
}
