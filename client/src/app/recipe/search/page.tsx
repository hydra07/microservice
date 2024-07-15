'use client';

import { searchRecipes } from '@/services/recipe.service';
import { Recipe } from 'CustomTypes';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import Pagination from './Pagination';
import SearchSection from './SearchSection';
import { Loader2 } from 'lucide-react';

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const itemsPerPage = 5;
  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, ingredients, currentPage]);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const data  = await searchRecipes(searchQuery, ingredients, (currentPage - 1) * itemsPerPage, itemsPerPage);
      if (data) {
        setRecipes(data.recipes);
        setTotalRecipes(data.total);
      } else {
        console.error('Search request failed');
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if(query === searchQuery) return;
    if(query.trim() === '') return;
    
    setSearchQuery(query);
    setCurrentPage(1);
    fetchRecipes();
  };    

  const handleAddIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
    setCurrentPage(1);
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white border rounded-lg overflow-hidden shadow-md p-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">
            {isLoading ? 'Searching...' : `Search Results`}
          </h1>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center text-gray-500">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <span>Fetching recipes...</span>
              </div>
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              <RecipeList recipes={recipes} />
              <Pagination 
                currentPage={currentPage}
                totalItems={totalRecipes}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        <div className="md:w-1/3">
          <SearchSection
            searchQuery={searchQuery}
            onSearch={handleSearch}
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
          />
        </div>
      </div>
    </div>
  );
}