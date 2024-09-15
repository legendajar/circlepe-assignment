import AdminDashboardCard from '@/components/Admin/AdminDashboardCards.jsx/AdminDashboardCard'
import { AdminDashboardChartData } from '@/components/Admin/AdminDashboardChartData./AdminDashboardChartData'
import React from 'react'

const DashboardSection = () => {
  return (
    <div className='w-full h-full'>
        <div className='flex flex-col gap-5 p-5 border rounded-md shadow-md'>
            <div className='flex items-center gap-4'>
                <AdminDashboardCard />
                <AdminDashboardCard />
                <AdminDashboardCard />
            </div>
            <div className='flex flex-col gap-5'>
                <h1 className='text-lg font-bold font-titleFonts'>Details of Order According to Month</h1>
                <AdminDashboardChartData />
            </div>
        </div>
    </div>
  )
}

export default DashboardSection