// TooltipWrapper.tsx
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
  label: string;
  delay?: number;
  sideStyle?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  label,
  delay = 200,
  sideStyle = "top",
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay} >
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={sideStyle} className="bg-gray-700 text-white p-2 rounded">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
