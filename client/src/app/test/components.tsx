
import React, { useState } from 'react';
import { CookingPot, Heart, ThumbsUp, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Reaction {
  icon: React.ElementType;
  label: string;
  color: string;
  count: number;
}

const reactions: Reaction[] = [
  { icon: CookingPot, label: 'Cooking Pot', color: 'text-green-500', count: 45 },
  { icon: Heart, label: 'Love', color: 'text-red-500', count: 78 },
  { icon: ThumbsUp, label: 'Like', color: 'text-blue-500', count: 123 },
];

const RecipeInteractions: React.FC = () => {
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const handleReaction = (label: string) => {
    setActiveReaction(activeReaction === label ? null : label);
  };

  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Reactions</h3>
      <div className="flex items-center space-x-4">
        {reactions.map((reaction) => (
          <button
            key={reaction.label}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              activeReaction === reaction.label ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => handleReaction(reaction.label)}
          >
            <reaction.icon className={`w-8 h-8 ${reaction.color} cursor-pointer`} />
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{reaction.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {reactions.map((reaction) => `${reaction.label}: ${reaction.count}`).join(' | ')}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-red-500 hover:text-red-600 mt-4">
            <Flag className="w-4 h-4 mr-2" />
            Report
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Recipe</DialogTitle>
          </DialogHeader>
          <RadioGroup defaultValue="inappropriate">
            {['Inappropriate content', 'Copyright violation', 'Spam or misleading', 'Other'].map((reason) => (
              <div key={reason} className="flex items-center space-x-2">
                <RadioGroupItem value={reason.toLowerCase().replace(/\s+/g, '-')} id={reason.toLowerCase().replace(/\s+/g, '-')} />
                <Label htmlFor={reason.toLowerCase().replace(/\s+/g, '-')}>{reason}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button type="button" className="mt-4" onClick={() => console.log('Report submitted')}>Submit Report</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeInteractions;