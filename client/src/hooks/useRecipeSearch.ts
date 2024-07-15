// hooks/useRecipeSearch.ts
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchRecipes } from '@/services/recipe.service';
import { Recipe } from 'CustomTypes';

export function useRecipeSearch(itemsPerPage: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, ingredients, currentPage]);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await searchRecipes(searchQuery, ingredients, currentPage, itemsPerPage);
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
    if (query.trim() === '') return;
    setSearchQuery(query);
    router.push(`/recipe/search?q=${encodeURIComponent(query)}`);
  };

  const handleAddIngredient = (ingredient: string) => {
    setIngredients(prev => [...prev, ingredient]);
    setCurrentPage(1);
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(prev => prev.filter(i => i !== ingredient));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    isLoading,
    recipes,
    totalRecipes,
    currentPage,
    searchQuery,
    ingredients,
    handleSearch,
    handleAddIngredient,
    handleRemoveIngredient,
    handlePageChange
  };
}