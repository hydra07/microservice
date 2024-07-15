import { Recipe } from 'CustomTypes';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChefHat, Bookmark } from 'lucide-react';

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-semibold">No recipes found</p>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex">
            <div className="p-3 flex-grow">
              <Link href={`/recipe/${recipe._id}`} className="text-lg font-semibold hover:text-blue-600 transition-colors duration-200">
                {recipe.title}
              </Link>
              <div className="mt-2 flex items-center text-xs text-gray-500 space-x-3">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{recipe.cook_time} mins</span>
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  <span>{recipe.serving} servings</span>
                </div>
                <div className="flex items-center">
                  <ChefHat size={14} className="mr-1" />
                  <span className="capitalize">{recipe.difficulty}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <Image 
                  src={recipe.user.avatar || '/image-not-found.png'} 
                  alt={recipe.user.name} 
                  width={20} 
                  height={20} 
                  className="rounded-full"
                />
                <span className="ml-1 text-xs font-medium text-gray-700">{recipe.user.name}</span>
              </div>
            </div>
            <div className="w-1/3 relative">
              <Image 
                src={recipe.images?.[0] || '/image-not-found.png'} 
                alt={recipe.title} 
                layout="fill" 
                objectFit="cover"
              />
              <button 
                className="absolute top-1 right-1 p-1 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-all duration-200"
                aria-label="Save recipe"
              >
                <Bookmark size={16} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}