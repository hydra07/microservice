import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackSectionProps {
  feedback: string;
  setFeedback: (feedback: string) => void;
  onAccept: () => void;
  onReject: () => void;
}

const FeedbackSection: FC<FeedbackSectionProps> = ({ feedback, setFeedback, onAccept, onReject }) => (
  <>
    <Textarea
      placeholder="Provide feedback to the user..."
      className="w-full"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
    />
    <div className="flex gap-2">
      <Button variant="destructive" onClick={onReject}>Reject</Button>
      <Button onClick={onAccept}>Approve</Button>
    </div>
  </>
);

export default FeedbackSection;