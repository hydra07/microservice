'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MetricCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        <Skeleton className="h-4 w-[100px]" />
      </CardTitle>
      <Skeleton className="h-4 w-4 rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-7 w-[60px]" />
      <Skeleton className="h-3 w-[40px] mt-1" />
    </CardContent>
  </Card>
);

const ChartSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle><Skeleton className="h-6 w-[150px]" /></CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" /> {/* Dashboard Metrics title */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      
      <ChartSkeleton /> {/* For the full-width chart */}
    </div>
  );
};

export default DashboardSkeleton;