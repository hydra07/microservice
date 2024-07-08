import React from "react";
import { CommentItem } from "./CommentItem";
import { ReviewType } from "CustomTypes";

interface CommentListProps {
  comments: ReviewType[];
  onImageClick: (imageSrc: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, onImageClick }) => {
  return (
    <div className="space-y-6">
      {comments.map((comment, index) => (
        <React.Fragment key={comment.id}>
          {index > 0 && <hr className="border-gray-200" />}
          <CommentItem comment={comment} onImageClick={onImageClick} />
        </React.Fragment>
      ))}
    </div>
  );
};