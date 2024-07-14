import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChefHat, SearchIcon, BookmarkIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import RecipeSection from "./recipe/components/RecipeSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 lg:p-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-12">
          <div className="mb-6">
            <Image
              src="/letscook.png"
              alt="Recipe Finder Logo"
              width={200}
              height={80}
              className="mx-auto"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-mono">
            Search our database of thousands of recipes to find the perfect dish for any occasion.
          </p>
        </header>
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
          <Input 
            type="search" 
            placeholder="Search for recipes..." 
            className="pl-10 pr-20 py-6 text-md rounded-md shadow-lg focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 transition duration-200"
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
          >
            Search
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button className="flex items-center gap-2 px-6 py-3 rounded-md shadow-lg bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition duration-200">
            <ChefHat className="w-5 h-5" />
            Create New Recipe
          </Button>
        </div>
      </div>

      <RecipeSection />
    </main>    
  );
}
