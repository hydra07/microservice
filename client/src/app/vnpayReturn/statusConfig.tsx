import { CheckIcon, LoaderIcon, XIcon } from "lucide-react";

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'error';

export const STATUS_CONFIG: Record<PaymentStatus, {
  title: string;
  message: string;
  icon: JSX.Element;
  color: string;
}> = {
  idle: {
    title: "Initializing...",
    message: "Please wait while we initialize your payment status.",
    icon: <LoaderIcon className="h-8 w-8 text-white animate-spin" />,
    color: "bg-yellow-500",
  },
  processing: {
    title: "Processing Payment...",
    message: "Your payment is being processed. This may take a moment.",
    icon: <LoaderIcon className="h-8 w-8 text-white animate-spin" />,
    color: "bg-blue-500",
  },
  success: {
    title: "Order Placed",
    message: "Your order has been successfully placed. You can view the details below.",
    icon: <CheckIcon className="h-8 w-8 text-white" />,
    color: "bg-green-500",
  },
  failed: {
    title: "Payment Failed",
    message: "There was an issue with your payment. Please try again or contact support.",
    icon: <XIcon className="h-8 w-8 text-white" />,
    color: "bg-red-500",
  },
  error: {
    title: "Error Verifying Payment",
    message: "We encountered an error while verifying your payment. Please try again or contact support.",
    icon: <XIcon className="h-8 w-8 text-white" />,
    color: "bg-red-500",
  },
};