'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', orders: 120 },
  { month: 'Feb', orders: 140 },
  { month: 'Mar', orders: 160 },
  { month: 'Apr', orders: 180 },
  { month: 'May', orders: 200 },
];

const OrderChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
       <BarChart data={data} className="text-sm">
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey="month" className="fill-gray-600 dark:fill-gray-400" />
          <YAxis className="fill-gray-600 dark:fill-gray-400" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderChart;
