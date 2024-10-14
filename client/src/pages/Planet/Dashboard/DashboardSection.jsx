import AdminDashboardCard from '@/components/Admin/AdminDashboardCards.jsx/AdminDashboardCard'
import { AdminDashboardChartData } from '@/components/Admin/AdminDashboardChartData./AdminDashboardChartData'
import useGetAllProduct from '@/hooks/useGetAllProduct'
import { ShoppingBasket, ShoppingBag, BadgeDollarSignIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
ShoppingBasket

const DashboardSection = () => {
  useGetAllProduct();
  const products = useSelector(store => store.product.productList)
  const monthsOrderList = useSelector(store => store.order.ordersByMonth)
  console.log(monthsOrderList[0].orders)
  const currentMonthOrder = () => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    if ( monthsOrderList[0].month === currentMonth && monthsOrderList[0].year === currentYear ) {
      return monthsOrderList[0].orders.length
    } else {
      return 0
    }
  } 

  const currentMonthEarning = () => {
    let earning = 0;  // Initialize inside the function
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
  
    if (monthsOrderList[0].month === currentMonth && monthsOrderList[0].year === currentYear) {
      for (let i = 0; i < monthsOrderList[0].orders.length; i++) {
        const order = monthsOrderList[0].orders[i].order;
        const product = order.product.product_id;
  
        // Calculate earnings based on product price and quantity
        earning += product.price * order.product.quantity;
      }
      return earning;
    } else {
      return 0;
    }
  };
  
  return (
    <div className='w-full h-full'>
        <div className='flex flex-col gap-5 p-5 border rounded-md shadow-md'>
            <div className='flex items-center gap-4'>
                <AdminDashboardCard title='Products' subTitle='Total Products' count={products?.length || 0} iconElement={<ShoppingBasket className="w-6 h-6 text-indigo-500" />} />
                <AdminDashboardCard title='Orders' subTitle='Total Orders This Month' count={currentMonthOrder()} iconElement={<ShoppingBag className="w-6 h-6 text-indigo-500" />} />
                <AdminDashboardCard title='Earnings' subTitle='Total Earnings of this Month' count={currentMonthEarning()} iconElement={<BadgeDollarSignIcon className="w-6 h-6 text-indigo-500" />} />
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