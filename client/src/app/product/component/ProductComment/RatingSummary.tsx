import React from "react";
import { StarIcon } from "lucide-react";

interface RatingSummaryProps {
  averageRating: number;
}

export const RatingSummary: React.FC<RatingSummaryProps> = ({ averageRating }) => {
  return (
    <div className="mb-4 text-center">
      <div className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
      <div className="text-xs text-gray-500">Average Rating</div>
      <div className="flex justify-center mt-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
        ))}
      </div>
    </div>
  );
};