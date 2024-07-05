"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, CircleX } from "lucide-react";

interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (status: string) => void;
}

const ORDER_STATUSES = ["pending", "shipping", "completed", "cancelled"] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

const statusIcons = {
  pending: Package,
  shipping: Truck,
  completed: CheckCircle,
  cancelled: CircleX,
};

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      {ORDER_STATUSES.map((status) => {
        const Icon = statusIcons[status as OrderStatus];
        return (
          <motion.button
            key={status}
            onClick={() => setActiveTab(status)}
            aria-selected={activeTab === status}
            role="tab"
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${
                activeTab === status
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === status && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                layoutId="activeBg"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TabButtons;