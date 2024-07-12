'use client'
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Recipe {
  id: number;
  name: string;
  description: string;
  initials?: string;
}

export default function RecipePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setMyRecipes] = useState<Recipe[]>([]);
  const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    fetch("/data/recipes.json")
      .then((response) => response.json())
      .then((data) => setMyRecipes(data))
      .catch((error) => console.error('Error fetching my recipes:', error));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Delicious Recipes</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="relative overflow-hidden rounded-lg group">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View recipe</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt={recipe.name}
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground">{recipe.description}</p>
              <Link
                href="#"
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-foreground"
                prefetch={false}
              >
                View Recipe
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}