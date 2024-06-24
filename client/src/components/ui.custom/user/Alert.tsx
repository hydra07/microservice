import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface AlertProps {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  
  export function Alert({ title, description, onConfirm, onCancel, open, setOpen }: AlertProps) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogOverlay className="fixed inset-0 bg-black bg-opacity-40" /> Apply Tailwind overlay styles */}
      {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
