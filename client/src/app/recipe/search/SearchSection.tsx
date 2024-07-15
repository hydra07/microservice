import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, X, Utensils } from 'lucide-react';

interface SearchSectionProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

export default function SearchSection({
  searchQuery,
  onSearch,
  ingredients,
  onAddIngredient,
  onRemoveIngredient
}: SearchSectionProps) {
  const [query, setQuery] = useState(searchQuery);
  const [ingredient, setIngredient] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      onAddIngredient(ingredient.trim());
      setIngredient('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-center mb-6">
        <Utensils size={24} className="text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Recipe Search</h2>
      </div>

      <form onSubmit={handleSearch} className="relative mb-4">
        <Input
          type="search"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 rounded-md border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
        <Button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors duration-200">
          <Search size={18} />
        </Button>
      </form>

      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Add ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-10 rounded-md border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
        <Button onClick={handleAddIngredient} className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors duration-200">
          <Plus size={18} />
        </Button>
      </div>

      {ingredients.length > 0 && (
        <div>
          <h3 className="font-medium mb-3 text-sm text-gray-700">Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <div key={ing} className="flex items-center bg-gray-100 rounded-md px-3 py-1">
                <span className="text-sm text-gray-700 mr-2">{ing}</span>
                <Button onClick={() => onRemoveIngredient(ing)} variant="ghost" size="sm" className="p-1 hover:bg-gray-200 rounded-full">
                  <X size={14} className="text-gray-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}