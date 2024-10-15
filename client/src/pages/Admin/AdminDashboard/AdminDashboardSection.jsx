import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminDashboardCard from '@/components/Admin/AdminDashboardCards.jsx/AdminDashboardCard';
import AdminDashboardChartData from '@/components/Admin/AdminDashboardChartData./AdminDashboardChartData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboardSection = () => {
  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Cards Section */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <AdminDashboardCard />
        <AdminDashboardCard />
        <AdminDashboardCard />
      </div>

      {/* Chart Section */}
      <div className="flex flex-col gap-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-800">Trade Details: Planet & Space Stations (Monthly)</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <AdminDashboardChartData />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSection;
