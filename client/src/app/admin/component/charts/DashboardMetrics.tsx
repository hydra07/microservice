"use client";

import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import {
  ClipboardIcon,
  DocumentCheckIcon,
  ShoppingCartIcon,
  UsersIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - replace with actual data fetching logic
const metrics = {
  recipesToCheck: 15,
  postsToCheck: 8,
  pendingOrders: 23,
  userCount: 1250,
  income: {
    current: 52000,
    previous: 48000,
  },
};

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => (
  <Card className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
    <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-100 dark:bg-slate-900">
      <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {title}
      </CardTitle>
      <Icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
    </CardHeader>
    <CardContent className="p-4">
      <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {value.toLocaleString()}
      </div>
      {trend && (
        <p
          className={`text-sm flex items-center mt-2 ${
            trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {trend.isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {Math.abs(trend.value).toFixed(1)}%
        </p>
      )}
    </CardContent>
  </Card>
);

const DashboardMetrics: React.FC = () => {
  const incomeDifference =
    ((metrics.income.current - metrics.income.previous) /
      metrics.income.previous) *
    100;

  return (
    <div className="p-8 bg-gray-50 dark:bg-slate-950">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 mb-6">
        Dashboard Metrics
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Recipes to Check"
          value={metrics.recipesToCheck}
          icon={ClipboardIcon}
        />
        <MetricCard
          title="Posts to Check"
          value={metrics.postsToCheck}
          icon={DocumentCheckIcon}
        />
        <MetricCard
          title="Pending Orders"
          value={metrics.pendingOrders}
          icon={ShoppingCartIcon}
        />
        <MetricCard
          title="Total Users"
          value={metrics.userCount}
          icon={UsersIcon}
        />
        <MetricCard
          title="Monthly Income"
          value={metrics.income.current}
          icon={BanknotesIcon}
          trend={{
            value: incomeDifference,
            isPositive: incomeDifference > 0,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardMetrics;
