import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "@/components/Link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

export default function ListRecipe({
  tag,
  page,
}: {
  tag?: string | null;
  page: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const take = 6;
  useEffect(() => {
    const fetching = async () => {
      try {
        const queryParams = [];
        if (tag) {
          queryParams.push(`tag=${tag}`);
        }
        if (page) {
          queryParams.push(`take=${take}`);
          queryParams.push(`skip=${(page - 1) * take}`);
        }
        const queryString =
          queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
        const res = await axios.get(`/api/recipe${queryString}`);
        console.log(res.data);
        setRecipes(res.data.recipes);
        setTotal(res.data.total);
        setIsLoading(false);
      } catch (error) {}
    };
    fetching().then();
    return () => {
      setRecipes([]);
    };
  }, [tag, page]);
  console.log(recipes, total, page);
  return (
    <>
      <div>
        <main className="container mx-auto py-12 px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </main>
      </div>
    </>
  );
}

export function RecipeCard({}) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg">
      <div className="relative group">
        <Link href="#" className="absolute inset-0 z-10">
          <span className="sr-only">View Recipe</span>
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <img
            src="/placeholder.svg"
            alt="Recipe Image"
            width={300}
            height={200}
            className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-50 transition-opacity"
          />
          {/*<img*/}
          {/*  src="/placeholder.svg"*/}
          {/*  alt="Recipe Image"*/}
          {/*  width={300}*/}
          {/*  height={200}*/}
          {/*  className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-50 transition-opacity"*/}
          {/*/>*/}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">
          Creamy Garlic Parmesan Chicken
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">Italian</Badge>
          <Badge variant="outline">Dairy-free</Badge>
          <Badge variant="outline">30-60 minutes</Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          A delicious and easy-to-make chicken dish with a creamy garlic
          parmesan sauce.
        </p>
        <div className="flex justify-between items-center">
          <Button variant="link">View Recipe</Button>
          <Button variant="outline">
            <HeartIcon className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
