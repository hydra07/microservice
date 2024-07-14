import React from 'react';
import { Recipe } from 'CustomTypes';

interface QuickFactsProps {
  recipe: Recipe;
}

const QuickFacts: React.FC<QuickFactsProps> = ({ recipe }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div className="bg-muted rounded-lg p-4 text-center">
        <p className="text-sm font-medium">Cook Time</p>
        <p className="text-lg font-bold">{recipe.cook_time} mins</p>
      </div>
      <div className="bg-muted rounded-lg p-4 text-center">
        <p className="text-sm font-medium">Servings</p>
        <p className="text-lg font-bold">{recipe.serving}</p>
      </div>
      <div className="bg-muted rounded-lg p-4 text-center">
        <p className="text-sm font-medium">Difficulty</p>
        <p className="text-lg font-bold">{recipe.difficulty}</p>
      </div>
      <div className="bg-muted rounded-lg p-4 text-center">
        <p className="text-sm font-medium">Ingredients</p>
        <p className="text-lg font-bold">{recipe.ingredients.length}</p>
      </div>
    </div>
  );
};

export default QuickFacts;