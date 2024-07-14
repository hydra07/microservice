import React from 'react';
import { CookingPotIcon, Heart, ThumbsUp } from "lucide-react";

const Reactions: React.FC = () => {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Reactions</h3>
      <div className="flex items-center space-x-8">
        <button className="flex items-center space-x-2">
          <CookingPotIcon className="w-5 h-5 text-green-500 cursor-pointer hover:scale-125" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">45</span>
        </button>
        <button className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-red-500 cursor-pointer hover:scale-125" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">78</span>
        </button>
        <button className="flex items-center space-x-2">
          <ThumbsUp className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-125" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">123</span>
        </button>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Total reactions to this recipe: 246</p>
    </div>
  );
};

export default Reactions;