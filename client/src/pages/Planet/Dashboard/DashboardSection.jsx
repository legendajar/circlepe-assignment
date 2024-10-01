import AdminDashboardCard from '@/components/Admin/AdminDashboardCards.jsx/AdminDashboardCard'
import { AdminDashboardChartData } from '@/components/Admin/AdminDashboardChartData./AdminDashboardChartData'
import { ShoppingBasket, ShoppingBag, BadgeDollarSignIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
ShoppingBasket

const DashboardSection = () => {
  const planets = useSelector(store => store.product.productListByPlanet)
  return (
    <div className='w-full h-full'>
        <div className='flex flex-col gap-5 p-5 border rounded-md shadow-md'>
            <div className='flex items-center gap-4'>
                <AdminDashboardCard title='Products' subTitle='Total Products' count={planets?.length || 0} iconElement={<ShoppingBasket className="w-6 h-6 text-indigo-500" />} />
                <AdminDashboardCard title='Orders' subTitle='Total Orders This Month' count={5} iconElement={<ShoppingBag className="w-6 h-6 text-indigo-500" />} />
                <AdminDashboardCard title='Earnings' subTitle='Total Earnings of this Month' count='Rs. 5' iconElement={<BadgeDollarSignIcon className="w-6 h-6 text-indigo-500" />} />
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