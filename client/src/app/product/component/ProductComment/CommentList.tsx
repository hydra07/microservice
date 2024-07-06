import React from "react";
import { CommentItem } from "./CommentItem";
import { ReviewType } from "CustomTypes";

interface CommentListProps {
  comments: ReviewType[];
  onImageClick: (imageSrc: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, onImageClick }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onImageClick={onImageClick} />
      ))}
    </div>
  );
};