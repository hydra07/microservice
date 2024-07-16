import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from '@/lib/axios';
import { ColumnDef } from '@tanstack/react-table';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import EditTags from './EditTags';
import Link from '@/components/Link';
import PreviewDialog from './PreviewDialog/PreviewDialog';
import { Recipe } from 'CustomTypes';

export const createColumns = (renderPreviewDialog: (recipe: Recipe) => React.ReactNode, renderRecipeIngredientsDialog : (recipe:Recipe) => React.ReactNode ): ColumnDef<Recipe>[] => [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const recipe = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Copy recipe ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditTags recipeId={recipe._id} currentTags={recipe.tags} />
            <DropdownMenuItem>View recipe details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: 'Author',
    cell: ({ getValue }) => {
      const user = getValue();
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={(user as any)?.avatar as string} alt={(user as any)?.name} />
            <AvatarFallback className="text-xs font-semibold bg-secondary text-secondary-foreground">
              {(user as any)?.name?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{(user as any)?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'CreateAt',
    cell: ({ getValue }) => {
      return <span>{new Date(getValue() as any).toLocaleDateString()} </span>;
    },
  },
  {
    accessorKey: 'isActivate',
    header: 'Published',
    cell: ({ row }) => {
      const recipe = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isActivate, setIsActivate] = useState(recipe.isActivate);
      return (
        <Checkbox
          checked={isActivate}
          // onCheckedChange={async () => {
          //   const res = await axios.put(
          //     `/api/recipe/${recipe._id}?isActivate=${!isActivate}`,
          //   );  
          //   const newRecipe = await res.data; 
          //   setIsActivate(newRecipe.isActivate);
          // }}
          disabled
        />
      );
    },
  },
  {
    accessorKey: '_id',
    header: 'Preview',
    cell: ({ row }) => {
      const recipe = row.original;
      return renderPreviewDialog(recipe);
    },
  }, 
  {
    accessorKey: '_id',
    header: 'Products',
    cell: ({ row }) => {
      const recipe = row.original;
      return renderRecipeIngredientsDialog(recipe);
    },
  }, 
];
