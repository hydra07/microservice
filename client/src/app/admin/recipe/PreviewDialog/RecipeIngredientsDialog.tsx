import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, HandCoins, Leaf, Plus, PlusCircle, PlusIcon, SearchIcon, ShoppingBag, XIcon } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { set } from 'nprogress';
import { fetchProducts, getAllProducts } from '@/services/product.service';
import { fetchProductCategories } from '@/services/productCategory.service';
import { Ingredient, ProductCategoryType, ProductType, Recipe } from 'CustomTypes';
import { useToast } from '@/hooks/useToast';
import Image from 'next/image';
import { updateIngredients } from '@/services/recipe.service';


const useProductFilter = (products: ProductType[], categories: ProductCategoryType[]) => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category.id))
  );

  return { search, setSearch, selectedCategories, setSelectedCategories, filteredProducts };
};

function AssignProductDialog({
  ingredient,
  onAssign,
  onUnassign,
  products,
  categories
}: {
  ingredient: Ingredient;
  onAssign: (productId: number) => void;
  onUnassign: () => void;
  products: ProductType[];
  categories: ProductCategoryType[];
}) {
  const { search, setSearch, selectedCategories, setSelectedCategories, filteredProducts } = useProductFilter(products, categories);
  const [isOpen, setIsOpen] = useState(false);

  const handleAssign = (productId: number) => {
    onAssign(productId);
    // setIsOpen(false);
  };

  const handleUnassign = () => {
    onUnassign();
    // setIsOpen(false);
  };



  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
  };

  const assignedProduct = products.find(p => p.id === ingredient.productId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          {ingredient.productId ? <CheckIcon className="h-5 w-5" /> : <PlusCircle className="h-5 w-5 text-green-500 hover:scale-125" />}
          <span className="sr-only">
            {ingredient.productId ? "View assigned product" : `Assign product to ${ingredient.name}`}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ingredient.productId ? "Assigned Product" : `Assign Product to ${ingredient.name}`}</DialogTitle>
          <DialogDescription>
            {ingredient.productId
              ? `${ingredient.name} is currently assigned to ${assignedProduct?.name}`
              : "Search for and select a product to assign."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {ingredient.productId && (
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <div>
                <p className="font-medium text-sm">Currently assigned:</p>
                <p className="text-muted-foreground">{assignedProduct?.name}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={handleUnassign}>
                Unassign
              </Button>
            </div>
          )}
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-background shadow-none appearance-none pl-8 pr-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>
          <Select
            value={selectedCategories.join(",")}
            onValueChange={(value) => setSelectedCategories(value.split(",").map(Number).filter(Boolean))}
          >
            <SelectTrigger className="w-full">
              <span>{selectedCategories.length ? `${selectedCategories.length} selected` : "Select categories"}</span>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-md transition-colors hover:bg-muted-hover"
                >
                  <div className="flex items-center gap-3">
                    <Image src={product.imgProducts[0]?.imageUrl || '/image-not-found.png'} alt={`${product.name} image`} width={40} height={40} className="rounded-md object-cover" />
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-muted-foreground text-xs">{product.description}</div>
                    </div>
                  </div>
                  <Button
                    variant={ingredient.productId === product.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleAssign(product.id)}
                    disabled={ingredient.productId === product.id}
                  >
                    {ingredient.productId === product.id ? "Assigned" : "Assign"}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface RecipeIngredientsDialogProps {
  recipe: Recipe;
  onAssignSuccess: (updatedIngredients: Ingredient[]) => void;
}

export default function RecipeIngredientsDialog({ recipe, onAssignSuccess }: RecipeIngredientsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>(recipe.ingredients);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<ProductCategoryType[]>([]);
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const categoriesData = await fetchProductCategories();
        setCategories(categoriesData);

        // Fetch products
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = (index: number, productId: number) => {
    setIngredients(prevIngredients => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = { ...newIngredients[index], productId };
      return newIngredients;
    });
  };

  const handleUnassign = (index: number) => {
    setIngredients(prevIngredients => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = { ...newIngredients[index], productId: undefined };
      return newIngredients;
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Send updated ingredients to the backend
      const data = await updateIngredients(recipe._id, ingredients);

      if (data) {
        toast.showToast("Recipe ingredients updated", "success");
        onAssignSuccess(ingredients); // Call the onAssignSuccess prop with updated ingredients
      } else {
        throw new Error('Failed to update ingredients');
      }
    } catch (error) {
      console.error("Error updating ingredients:", error);
      toast.showToast("Failed to update recipe ingredients", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-600 hover:bg-slate-500 shadow-lg rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <HandCoins size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl mx-auto py-8">
        <DialogHeader>
          <DialogTitle>Recipe Ingredients</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-16 bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ingredients.map((ingredient, index) => (
              <div
              key={ingredient._id}
              className="flex items-center justify-between bg-white rounded-lg shadow-md p-2 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-gray-700">{ingredient.name}</div>
                  <span className="text-sm text-gray-500">
                    {ingredient.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {ingredient.productId && (
                    <Badge variant="secondary" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-2 py-1 text-xs">
                      <span className="truncate max-w-[100px]">
                        {products.find(p => p.id === ingredient.productId)?.name || 'Product Assigned'}
                      </span>
                    </Badge>
                  )}
                  <AssignProductDialog
                    ingredient={ingredient}
                    onAssign={(productId) => handleAssign(index, productId)}
                    onUnassign={() => handleUnassign(index)}
                    products={products}
                    categories={categories}
                  />
                </div>
              </div>
            ))}
          </div>

        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}