"use client";

import React from "react";
import { Button } from "@/components/ui/button";
interface TabButtonsProps {
    activeTab: string;
    setActiveTab: (status: string) => void;
    
}
const TabButtons = ({ activeTab, setActiveTab }: {
    activeTab: string;
    setActiveTab: any;
}) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      {["pending", "shipping", "completed"].map((status) => (
        <Button
          key={status}
          variant={activeTab === status ? "default" : "outline"}
          onClick={() => setActiveTab(status)}
          role="tab"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default TabButtons;
