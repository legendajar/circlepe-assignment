import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AdminDashboardCard from '@/components/Admin/AdminDashboardCards.jsx/AdminDashboardCard';
import { AdminDashboardChartData } from '@/components/Admin/AdminDashboardChartData./AdminDashboardChartData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const AdminDashboardSection = () => {
    
    return (
        <div className='flex flex-col gap-5'>
            <div className='my-2 grid lgl:grid-cols-2 xl:grid-cols-3  gap-2'>
                <AdminDashboardCard />
                <AdminDashboardCard />
                <AdminDashboardCard />
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-lg font-bold font-titleFonts'>Details of Trade between Planet and Space Stations In Each Months</h1>
                <AdminDashboardChartData />
            </div>
            
        </div>

    )
}

export default AdminDashboardSection