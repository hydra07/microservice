import { FC, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { Check, CheckIcon, Hand, Timer, Users } from 'lucide-react';
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-slate-600 hover:bg-slate-500">
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] font-mono">
                <DialogHeader>
                    <DialogTitle>Recipe Preview</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold    ">{recipe.title}</h2>
                        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                            <IngredientsList ingredients={recipe.ingredients} />
                            <InstructionsList steps={recipe.steps} />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <h3 className="text-sm font-medium">Media</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image
                                src={recipe.images[0] || "/image-not-found.png"}
                                alt={recipe.title}
                                width={300}
                                height={200}
                                className="rounded-md object-cover aspect-[3/2]"
                            />
                            <RecipeDetails
                                cookTime={recipe.cook_time}
                                serving={recipe.serving}
                                difficulty={recipe.difficulty}
                                description={recipe.description}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-4">
                    <FeedbackSection
                        feedback={feedback}
                        setFeedback={setFeedback}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PreviewDialog;