'use client';

import { PostRecipeData } from 'chart';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', posts: 100, recipes: 120 },
  { month: 'Feb', posts: 150, recipes: 140 },
  { month: 'Mar', posts: 180, recipes: 160 },
  { month: 'Apr', posts: 200, recipes: 180 },
  { month: 'May', posts: 220, recipes: 200 },
];

interface PostRecipeChartProps {
  data: PostRecipeData[];
}

const PostRecipeChart: React.FC<PostRecipeChartProps> = ({data}) => {
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
          <Bar dataKey="posts" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recipes" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
  );
};

export default PostRecipeChart;
