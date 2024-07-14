import React from 'react';
import { Recipe } from 'CustomTypes';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  recipe: Recipe;
}

const HeroSection: React.FC<HeroSectionProps> = ({ recipe }) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold mb-4">{recipe.title}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {recipe.description}
          </p>

          <div className="flex items-center mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
            <Avatar className="w-16 h-16 rounded-full shadow-lg">
              <AvatarImage src={recipe.user.avatar} alt={recipe.user.name} />
              <AvatarFallback>{recipe.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex flex-col justify-center">
              <p className="font-semibold text-xl text-gray-900 dark:text-gray-100">{recipe.user.name}</p>
              <Button
                variant="outline"
                className="mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;