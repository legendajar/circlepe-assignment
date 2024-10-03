import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useGetAllPlanetOrder from '@/hooks/useGetAllPlanetOrder'
import { useSelector } from 'react-redux'
import { CircleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PlanetListOrderSection = () => {
  const user = useSelector(store => store.planet.user)
  useGetAllPlanetOrder(user._id)
  const orders = useSelector((store) => store.planet.planetOrderList)
  console.log(orders)
  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/planet/order/view/${id}`)
  }
  return (
    <div className='w-full h-full p-6'>
      <div className='flex flex-col gap-5 p-6 border border-gray-200 rounded-md shadow-md bg-white'>
        {/* Header */}
        <div className='flex items-center justify-between gap-5'>
          <h1 className='text-2xl font-bold font-titleFonts text-gray-800'>Orders</h1>
          <Input 
            type='text' 
            className='w-2/5 border border-gray-300 p-3 rounded-md shadow-sm focus:ring focus:ring-blue-200 transition duration-200' 
            placeholder='Search by Product Name or ID'
          />
        </div>
        <hr className='my-3 border-gray-200' />

        {/* Table */}
        <div className='w-full overflow-auto'>
          <Table className='min-w-full'>
            <TableHeader>
              <TableRow className='bg-gray-100'>
                <TableHead className='text-left text-gray-600 py-3 px-4'>S.No</TableHead>
                <TableHead className='text-left text-gray-600 py-3 px-4'>OrderId</TableHead>
                <TableHead className='text-left text-gray-600 py-3 px-4'>Quantity</TableHead>
                <TableHead className='text-left text-gray-600 py-3 px-4'>Price</TableHead>
                <TableHead className='text-left text-gray-600 py-3 px-4'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders && orders.length > 0 ? (
                  orders.map((order, index) => (
                    <TableRow key={index} className={`hover:bg-gray-50 transition duration-200`}>
                      <TableCell className='py-3 px-4'>{index + 1}</TableCell>
                      <TableCell className='py-3 px-4'>{order._id}</TableCell>
                      <TableCell className='py-3 px-4'>{order.totalQuantity || 'N/A'}</TableCell>
                      <TableCell className='py-3 px-4'>${order.totalPrice || 'N/A'}</TableCell>
                      <TableCell className='py-3 px-4'>
                        <button className="text-blue-500 hover:text-blue-600 font-medium transition duration-150" onClick={() => handleViewDetail(order._id)}>View Details</button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center py-8'>
                      <div className='flex flex-col items-center gap-2'>
                        <CircleAlert className='text-5xl text-gray-400' />
                        <span className='text-xl text-gray-500 font-semibold'>No Orders Found</span>
                        <span className='text-gray-400'>Your recent orders will appear here.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default PlanetListOrderSection
