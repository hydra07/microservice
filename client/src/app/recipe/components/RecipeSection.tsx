import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { BookmarkIcon, CookingPot, Heart, SearchIcon, ThumbsUp } from "lucide-react";

export default function RecipeSection() {
  return (
    <section className="px-4 md:px-6 py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto grid gap-12">
        {["Appetizers", "Main Dishes", "Desserts"].map((category) => (
          <div key={category}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{category}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden bg-white dark:bg-gray-800">
                  <CardContent className="p-0">
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <img src="/image-not-found.png" alt="User avatar" />
                        </Avatar>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">John Doe</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src="/image-not-found.png"
                        alt={`${category} ${item}`}
                        width={300}
                        height={200}
                        className="w-full aspect-[3/2] object-cover"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-75 dark:bg-gray-700 dark:bg-opacity-50 dark:hover:bg-opacity-75"
                      >
                        <BookmarkIcon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">{`${category.slice(0, -1)} ${item}`}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center bg-slate-200 dark:bg-gray-700 rounded-full px-2">
                          <CookingPot className="h-4 w-4 mr-1 text-blue-400 fill-current" />
                          <span>{Math.floor(Math.random() * 100)}</span>
                        </div>
                        <div className="flex items-center bg-slate-200 dark:bg-gray-700 rounded-full px-2">
                          <Heart className="h-4 w-4 mr-1 text-red-400 fill-current" />
                          <span>{Math.floor(Math.random() * 1000)}</span>
                        </div>
                        <div className="flex items-center bg-slate-200 dark:bg-gray-700 rounded-full px-2">
                          <ThumbsUp className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                          <span>{Math.floor(Math.random() * 500)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="flex items-center gap-2 text-gray-800 dark:text-gray-100 border-gray-800 dark:border-gray-100">
                <SearchIcon className="h-4 w-4" />
                View other {category.toLowerCase()}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
