import React from "react";
import { Recipe } from "CustomTypes";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, CheckIcon, Flag, ShareIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Reactions from "./Reactions";

interface SidebarProps {
  recipe: Recipe;
}

const Sidebar: React.FC<SidebarProps> = ({ recipe }) => {
  return (
    <div className="lg:w-1/3">
      <div className="sticky top-4 space-y-8">
        <Reactions recipeId={recipe._id} />

        <div className="bg-muted rounded-lg p-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600"
              >
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
              <Button type="submit" className="mt-4">
                Submit Report
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient._id} className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                <span>
                  {ingredient.name} - {ingredient.quantity}
                </span>
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
    </div>
  );
};

export default Sidebar;
