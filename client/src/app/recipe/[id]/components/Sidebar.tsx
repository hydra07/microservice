import React, { useState } from 'react';
import { Recipe } from 'CustomTypes';
import { Button } from "@/components/ui/button";
import { CheckIcon, BookmarkIcon, ShareIcon, Flag, PlusIcon, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Reactions from './Reactions';
import { useAddToCart } from '@/hooks/useAddToCart';
import { getProductById } from '@/services/product.service';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from 'react-toastify';

import Link from 'next/link';

interface SidebarProps {
  recipe: Recipe;
}

const toastConfig = {
  autoClose: 1000,
}

const Sidebar: React.FC<SidebarProps> = ({ recipe }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { handleAddToCart } = useAddToCart();
  // const { showToast } = useToast();

  const handleAddToCartClick = async (productId: number) => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const product = await getProductById(productId);

      if (product) {
        await handleAddToCart(1, product);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error state or feedback to the user
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="lg:w-1/3">
      <div className="sticky top-4 space-y-8">
        <Reactions />

        <div className="bg-muted rounded-lg p-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-red-500 hover:text-red-600">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Recipe</DialogTitle>
              </DialogHeader>
              <RadioGroup>
                {['inappropriate', 'copyright', 'spam', 'other'].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button type="submit" className="mt-4">Submit Report</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
          <ul className="space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient._id} className="flex items-center justify-between gap-2 group">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-primary" />
                    <span>{ingredient.name} - {ingredient.quantity}</span>
                  </div>
                  {ingredient.productId && (
                    <div className="flex items-center gap-2 transition-opacity duration-300">
                      <Link href={`/product/${ingredient.productId}`} passHref>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleAddToCartClick(ingredient.productId!)}
                          disabled={isAddingToCart}
                          className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800'
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800'>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <Button className="w-full">
            <BookmarkIcon className="w-5 h-5 mr-2" />
            Save Recipe
          </Button>
          <Button variant="outline" className="w-full">
            <ShareIcon className="w-5 h-5 mr-2" />
            Share Recipe
          </Button>
        </div>
      </div>
      <ToastContainer {...toastConfig} />
    </div>
  );
};

export default Sidebar;