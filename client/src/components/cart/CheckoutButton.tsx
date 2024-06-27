import { Button } from "@/components/ui/button";
import { TruckIcon } from "lucide-react";

interface CheckoutButtonProps {
  insufficientList: string[];
  onCheckout: () => void;
}

export default function CheckoutButton({ insufficientList, onCheckout }: CheckoutButtonProps) {
  return (
    <Button
      className={`w-full py-3 rounded-full text-white transition-transform hover:scale-105 active:scale-95 ${
        insufficientList.length > 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={() => {
        if (insufficientList.length === 0) {
          onCheckout();
        }
      }}
      disabled={insufficientList.length > 0}
    >
      <TruckIcon className="h-5 w-5 mr-2" />
      {insufficientList.length > 0
        ? "Review Cart"
        : "Proceed to Checkout"}
    </Button>
  );
}