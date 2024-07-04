import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyCartProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function EmptyCart({ setIsOpen }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <ShoppingBagIcon className="h-16 w-16 text-gray-400" />
      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mt-2">
        Looks like you have not added anything to your cart yet.
      </p>
      <Button
        variant="outline"
        className="mt-6 px-6 py-3 rounded-full transition-colors hover:text-green-600"
        onClick={() => setIsOpen(false)}
      >
        Start Shopping
      </Button>
    </div>
  );
}