import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckIcon, ThumbsUpIcon, ThumbsDownIcon, MessageCircleIcon, BookmarkIcon, XIcon, ShareIcon, PrinterIcon, StarIcon, CookingPotIcon, Heart, ThumbsUp, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step {
  images: string[];
  description: string;
}

interface Comment {
  avatar: string;
  initials: string;
  name: string;
  timeAgo: string;
  text: string;
  likes: number;
}

const ingredients = [
  { name: "Pasta", amount: "8 oz" },
  { name: "Mushrooms", amount: "8 oz, sliced" },
  { name: "Heavy cream", amount: "1 cup" },
  { name: "Garlic", amount: "4 cloves, minced" },
  { name: "Parmesan cheese", amount: "1/2 cup, grated" },
  { name: "Salt and pepper", amount: "to taste" },
];

const steps: Step[] = [
  {
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "Cook the pasta according to package instructions. Drain and set aside.",
  },
  {
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "In a large skillet, sauté the mushrooms over medium-high heat until they release their moisture and start to brown.",
  },
  {
    images: ["/placeholder.svg"],
    description: "Add the minced garlic to the skillet and cook for 1-2 minutes until fragrant.",
  },
  {
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Pour in the heavy cream and stir to combine. Bring the mixture to a simmer and let it thicken slightly.",
  },
  {
    images: ["/placeholder.svg"],
    description: "Add the cooked pasta to the skillet and toss to coat. Sprinkle in the grated Parmesan cheese and season with salt and pepper.",
  },
  {
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "Serve the creamy garlic mushroom pasta hot, garnished with additional Parmesan cheese if desired.",
  },
];

const comments: Comment[] = [
  {
    avatar: "/placeholder-user.jpg",
    initials: "JD",
    name: "John Doe",
    timeAgo: "2 days ago",
    text: "This recipe is absolutely delicious! The creamy garlic sauce is so flavorful, and the mushrooms add a great texture. Definitely a new favorite in my household.",
    likes: 12,
  },
  {
    avatar: "/placeholder-user.jpg",
    initials: "JS",
    name: "Jane Smith",
    timeAgo: "1 week ago",
    text: "I made this recipe last night and it was a huge hit! The instructions were easy to follow, and the end result was absolutely delicious. Highly recommend!",
    likes: 8,
  },
];



export default function Component() {


  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src="/path/to/recipe-image.jpg" // Replace with your actual image source
                alt="Recipe Main Image"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-4xl font-bold mb-4">Recipe Name</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                This is the description of the recipe. It provides an overview of the recipe and any additional details that might interest the user.
              </p>

              {/* Author Section */}
              <div className="flex items-center mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
                <Avatar className="w-16 h-16 rounded-full shadow-lg">
                  <AvatarImage src="/path/to/author-image.jpg" alt="Author Image" />
                  <AvatarFallback className="bg-gray-300 text-gray-700">AB</AvatarFallback> {/* Replace with author initials */}
                </Avatar>
                <div className="ml-4 flex flex-col justify-center">
                  <p className="font-semibold text-xl text-gray-900 dark:text-gray-100">Author Name</p>
                  <Button
                    variant="outline"
                    className="mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
                  >
                    Follow
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm font-medium">Prep Time</p>
                <p className="text-lg font-bold">30 mins</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm font-medium">Cook Time</p>
                <p className="text-lg font-bold">20 mins</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm font-medium">Servings</p>
                <p className="text-lg font-bold">4</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm font-medium">Difficulty</p>
                <p className="text-lg font-bold">Easy</p>
              </div>
            </div>

            {/* Instructions */}
            <h2 className="text-3xl font-bold mb-6">Instructions</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">{step.description}</p>
                    <div className="flex flex-wrap gap-4">
                      {step.images.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Step ${index + 1} - Image ${imgIndex + 1}`}
                          className="w-full md:w-1/4 h-48 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* Cook's Notes */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Cooks Notes</h2>
              <textarea
                className="w-full p-4 border rounded-lg"
                rows={4}
                placeholder="Add your own notes or variations here..."
              ></textarea>
            </div>

            {/* Comments */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Comments</h2>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {comments.map((comment, index) => (
                  <div key={index} className="py-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{comment.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{comment.name}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{comment.timeAgo}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
                        <ThumbsUpIcon className="w-4 h-4 mr-2" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500">
                        <ThumbsDownIcon className="w-4 h-4 mr-2" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-500">
                        <MessageCircleIcon className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-4 space-y-8">
              {/* Recipe Rating */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Reactions</h3>
                <div className="flex items-center space-x-8">
                  <button className="flex items-center space-x-2">
                    <CookingPotIcon className="w-5 h-5 text-green-500 cursor-pointer hover:scale-125" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">45</span>
                  </button>
                  <button className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500 cursor-pointer hover:scale-125" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">78</span>
                  </button>
                  <button className="flex items-center space-x-2">
                    <ThumbsUp className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-125" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">123</span>
                  </button>
                </div>
                <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Total reactions to this recipe: 246</p>
              </div>

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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inappropriate" id="inappropriate" />
                        <Label htmlFor="inappropriate">Inappropriate content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="copyright" id="copyright" />
                        <Label htmlFor="copyright">Copyright violation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="spam" id="spam" />
                        <Label htmlFor="spam">Spam or misleading</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    <Button type="submit" className="mt-4">Submit Report</Button>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Ingredients */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-primary" />
                      <span>{ingredient.name} - {ingredient.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
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
          </div>
        </div>

        {/* Related Recipes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add related recipe cards here */}
          </div>
        </div>
      </div>
    </div>
  );
}