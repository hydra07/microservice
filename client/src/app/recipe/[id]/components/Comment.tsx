"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/string.utils";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ChangeEvent, FormEvent, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import axios from "@/lib/axios";

function RecipeComment({ comment }: any) {
  return (
    <div className="space-y-4 w-full">
      <div
        className={cn(
          "flex items-start gap-4",
          //  `pl-[${56 * level}px]`
        )}
      >
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>{getInitials(comment.user.username)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{comment.user.username}</div>
            <small className="text-gray-500 dark:text-gray-400 ">
              {formatDistanceToNow(parseISO(comment.createdAt))}
            </small>
          </div>
          {/*<div>*/}
          {/*  <div*/}
          {/*    className="comment"*/}
          {/*    dangerouslySetInnerHTML={{ __html: comment.content }}*/}
          {/*  />*/}
          {/*</div>*/}
          <div>{comment.content}</div>
          <div className="flex items-center gap-2">
            <div className="w-4"></div>
            {/*<Button variant="ghost" size="icon">*/}
            {/*<HeartIcon className="w-4 h-4" />*/}
            {/*<span className="sr-only">Like</span>*/}
            {/*</Button>*/}
            {/*<Button variant="ghost" size="icon" onClick={onToggleReply}>*/}
            {/*  <MessageCircleIcon className="w-4 h-4" />*/}
            {/*  <span className="sr-only">Reply</span>*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListComment({
  comments,
  recipeId,
}: {
  comments: any[];
  recipeId: string;
}) {
  const { user } = useAuth();
  return (
    <>
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl">Comment</h1>
        {user && <AddCommentForm userId={user.id} recipeId={recipeId} />}
        <div className="w-3/4 flex flex-col space-y-3">
          {Array.isArray(comments) &&
            comments.map((comment: any) => (
              <RecipeComment key={comment._id} comment={comment} />
            ))}
        </div>
      </div>
    </>
  );
}

function AddCommentForm({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!userId) return null;

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/recipe/${recipeId}/comments`, {
        userId: userId,
        content: commentText,
      });

      // Comment posted successfully
      setCommentText("");
      // You might want to update the comments list here or trigger a refetch
      console.log("Comment posted:", response.data);
    } catch (error) {
      console.error("Error posting comment:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={commentText}
        onChange={handleInputChange}
        placeholder="Add a comment..."
        className="min-h-[100px] resize-none"
      />
      <Button
        type="submit"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        <Send className="mr-2 h-4 w-4" />
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}
export default ListComment;
