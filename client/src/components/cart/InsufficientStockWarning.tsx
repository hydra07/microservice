import { AlertTriangleIcon } from "lucide-react";

interface InsufficientStockWarningProps {
  insufficientList: string[];
}

export default function InsufficientStockWarning({ insufficientList }: InsufficientStockWarningProps) {
  if (insufficientList.length === 0) return null;

  return (
    <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
      <div className="flex items-center">
        <AlertTriangleIcon className="h-5 w-5 mr-2" />
        <p className="font-semibold">Attention Required</p>
      </div>
      <p className="mt-2">
        Some items in your cart have insufficient stock. Please review
        your cart before proceeding.
      </p>
    </div>
  );
}