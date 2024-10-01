import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from '@/utils/cn.js';
import { TrendingUp } from 'lucide-react';

const AdminDashboardCard = ({ title, subTitle, count, iconElement }) => {
  return (
    <Card className="w-[250px] smd:w-[350px] rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm text-white">{subTitle}</CardDescription>
          </div>
          <div className="p-2 bg-white rounded-full text-indigo-500">
          {iconElement}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-3xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardCard;
