import { FC } from 'react';
import { Timer, Users, Hand } from 'lucide-react';

interface RecipeDetailsProps {
  cookTime: number;
  serving: number;
  difficulty: string;
  description: string;
}

const RecipeDetails: FC<RecipeDetailsProps> = ({ cookTime, serving, difficulty, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-slate-400">
    <p className="flex items-center mb-2 text-gray-700">
      <Timer className="mr-2 h-5 w-5 text-blue-500" />
      <span className="font-semibold">{cookTime} minutes</span>
    </p>
    <p className="flex items-center mb-2 text-gray-700">
      <Users className="mr-2 h-5 w-5 text-green-500" />
      <span className="font-semibold">{serving} servings</span>
    </p>
    <p className="flex items-center text-gray-700">
      <Hand className="mr-2 h-5 w-5 text-yellow-500" />
      <span className="font-semibold">{difficulty}</span>
    </p>
    <p className="mt-2">
      <span className='font-bold'>Description: </span>
      {description}
    </p>
  </div>
);

export default RecipeDetails;   