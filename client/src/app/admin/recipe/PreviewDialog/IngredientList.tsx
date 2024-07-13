import { FC } from 'react';
import { Check } from 'lucide-react';
import { Ingredient } from 'CustomTypes';

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const IngredientsList: FC<IngredientsListProps> = ({ ingredients }) => (
  <div>
    <h3 className="text-sm font-medium mb-2">Ingredients</h3>
    <ul className="space-y-1 text-sm">
      {ingredients.map((ingredient) => (
        <li key={ingredient._id} className="flex items-center">
          <Check className="mr-2 h-4 w-4" />
          {ingredient.name} - {ingredient.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;