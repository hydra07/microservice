import { FC, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Eye, Printer } from 'lucide-react';
import { Recipe } from 'CustomTypes';
import FeedbackSection from './FeedbackSection';
import RecipeDetails from './RecipeDetails';
import InstructionsList from './InstructionList';
import IngredientsList from './IngredientList';

interface PreviewDialogProps {
    recipe: Recipe;
    onAction: (id: string, action: 'accept' | 'reject', feedback: string) => void;
}

const PreviewDialog: FC<PreviewDialogProps> = ({ recipe, onAction }) => {
    const [feedback, setFeedback] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleAccept = () => {
        onAction(recipe._id, 'accept', feedback);
    };

    const handleReject = () => {
        onAction(recipe._id, 'reject', feedback);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-slate-600 hover:bg-slate-500 shadow-lg rounded-lg transition-all duration-300 hover:scale-105">
                    <Eye size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-2 rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-2">{recipe.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-4 bg-gray-50 p-4 rounded-lg dark:bg-slate-800">
                        <div>
                            <Image
                                src={recipe.images[0] || "/image-not-found.png"}
                                alt={recipe.title}
                                width={200}
                                height={150}
                                className="rounded-md object-cover aspect-[4/3] shadow-md mb-2"
                            />
                            <RecipeDetails
                                cookTime={recipe.cook_time}
                                serving={recipe.serving}
                                difficulty={recipe.difficulty}
                                description={recipe.description}
                            />
                        </div>
                        <div className="space-y-4">
                            <IngredientsList ingredients={recipe.ingredients} />
                            <InstructionsList steps={recipe.steps} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex flex-col gap-2 mt-4">
                    <FeedbackSection
                        feedback={feedback}
                        setFeedback={setFeedback}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
};

export default PreviewDialog;
