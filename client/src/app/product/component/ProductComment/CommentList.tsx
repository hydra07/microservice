import React from "react";
import { CommentItem } from "./CommentItem";
import { ReviewType } from "CustomTypes";

interface CommentListProps {
  comments: ReviewType[];
  currentPage: number;
  commentsPerPage: number;
  onImageClick: (imageSrc: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, currentPage, commentsPerPage, onImageClick }) => {
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <div className="space-y-4">
      {currentComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onImageClick={onImageClick} />
      ))}
    </div>
  );
};