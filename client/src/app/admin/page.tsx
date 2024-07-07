import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';
import Order from './orders/page';

const PostRecipeChart = dynamic(() => import('./component/charts/PostRecipeChart'), { ssr: false });
const RevenueChart = dynamic(() => import('./component/charts/RevenueChart'), { ssr: false });
const TopProductsChart = dynamic(() => import('./component/charts/TopProductChart'), { ssr: false });
const OrderChart = dynamic(() => import('./component/charts/OrderChart'), { ssr: false });
const DashboardMetrics = dynamic(() => import('./component/charts/DashboardMetrics'), { ssr: false });

export default function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen dark:bg-slate-950">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 dark:text-gray-100">Dashboard</h1>
      <DashboardMetrics />
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 py-4">Statistics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-blue-100 dark:bg-blue-900 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-blue-800 dark:text-blue-200">Posts and Recipes per Month</CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-slate-800">
            <PostRecipeChart />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-green-100 dark:bg-green-900 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-green-800 dark:text-green-200">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-slate-800">
            <RevenueChart />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-purple-100 dark:bg-purple-900 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-purple-800 dark:text-purple-200">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-slate-800">
            <TopProductsChart />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-red-100 dark:bg-red-900 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-red-800 dark:text-red-200">Orders</CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-slate-800">
            <OrderChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
