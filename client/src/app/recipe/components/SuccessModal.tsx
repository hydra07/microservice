// SuccessModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';
import { Recipe } from 'CustomTypes';
import Image from 'next/image';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  onCreateAnother: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, recipe, onCreateAnother }) => {
  const router = useRouter();

  const viewRecipe = () => {
    if (recipe) {
    //   router.push(`/recipes/${recipe._id}`);
    }
  };

  const goToCollection = () => {
    // router.push('/my-recipes');
  };

  



  if (!recipe) return null;

  return (
    <>
      {isOpen && <Confetti />}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Recipe Submitted Successfully!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{recipe.description}</p>
            <Image src={recipe.images[0]} width={400} height={400} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-4" />
          </div>
          <div className="flex flex-col space-y-2">
            {/* <Button onClick={viewRecipe}>View Recipe</Button> */}
            <Button onClick={onCreateAnother} className='bg-green-400 hover:bg-green-300'>Create Another Recipe</Button>
            <Button onClick={goToCollection} variant="secondary">Go to My Recipes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SuccessModal;