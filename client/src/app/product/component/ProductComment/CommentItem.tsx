import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { ImageGallery } from "./ImageGallary";
import { ReviewType } from "CustomTypes";

interface CommentItemProps {
  comment: ReviewType;
  onImageClick: (imageSrc: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onImageClick }) => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">{comment.user.name}</div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-3 w-3 ${i < comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          <time dateTime={comment.createAt}>{new Date(comment.createAt).toLocaleDateString()}</time>
        </div>
        <div className="mt-1 text-xs leading-relaxed text-gray-700">{comment.comment}</div>
        <ImageGallery images={comment.images} onImageClick={onImageClick} />
      </div>
    </div>
  );
};