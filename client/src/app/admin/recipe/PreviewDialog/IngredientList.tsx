import { FC } from 'react';
import { Check } from 'lucide-react';
import { Ingredient } from 'CustomTypes';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const IngredientsList: FC<IngredientsListProps> = ({ ingredients }) => (
  <ScrollArea className="h-[200px]">
    <h3 className="text-sm font-semibold mb-2">Ingredients</h3>
    <ul className="space-y-1 text-sm">
      {ingredients.map((ingredient) => (
        <li key={ingredient._id} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-green-500" />
          {ingredient.name} - {ingredient.quantity}
        </li>
      ))}
    </ul>
  </ScrollArea>
);

export default IngredientsList;