import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Recipe {
  id: number;
  name: string;
  description: string;
  initials?: string;
}

interface SavedRecipesProps {
  recipes: Recipe[];
  onRemove: (recipeId: number) => void;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ recipes, onRemove }) => {
  return (
    <div className="py-6 md:py-8 h-[550px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="p-4 flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{recipe.initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="font-medium">{recipe.name}</div>
              <div className="text-muted-foreground text-sm">{recipe.description}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onRemove(recipe.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
