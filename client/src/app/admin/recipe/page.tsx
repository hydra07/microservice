"use client";
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadcrumbTitle from '../component/Breadcrumb';
import { createColumns } from './columns';
import { DataTable } from './data-table';
import { Breadcrumb } from '@/components/Breadcrumb';
import PreviewDialog from './PreviewDialog/PreviewDialog';
import { Ingredient, Recipe } from 'CustomTypes';
import RecipeIngredientsDialog from './PreviewDialog/RecipeIngredientsDialog';
import { on } from 'events';
export default function RecipePage() {
  const [data, setData] = useState<any[]>([]);

  const handleAction = async (id: string, action: 'accept' | 'reject', feedback: string) => {
    try {
      const response = await axios.post(`/api/recipe/${id}/${action}`, { feedback });
      const updatedRecipe = response.data; // Assuming the updated recipe is returned in the response data

      // Update the recipes state with the updated recipe
      setData(prevRecipes => prevRecipes.map(recipe =>
        recipe._id === id ? updatedRecipe : recipe
      ));
    } catch (error) {
      console.error(`Error ${action}ing recipe:`, error);
    }
  };

  const handleAssignSuccess = (recipeId: string, updatedIngredients: Ingredient[]) => {
    setData(prevData => prevData.map(recipe =>
      recipe._id === recipeId
        ? { ...recipe, ingredients: updatedIngredients }
        : recipe
    ));
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get('/api/recipe');
        setData(res.data.recipes); // Adjusted to match the backend response structure
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetching();
  }, []);

  const columns = createColumns((recipe: Recipe) => (

    <PreviewDialog recipe={recipe}
      onAction={handleAction}
    />
  ), (recipe: Recipe) => (
    <RecipeIngredientsDialog
     recipe={recipe}
     onAssignSuccess={(updatedIngredients) => handleAssignSuccess(recipe._id, updatedIngredients)}
    />
  ));

  return (
    <>
      <Breadcrumb items={
        [
          { label: 'Home', link: '/' },
          { label: 'Admin', link: '/admin' },
          { label: 'Recipe', link: '/admin/recipe' },
        ]
      } />
      <DataTable columns={columns} data={data} />
      <ToastContainer />
    </>
  );
}

