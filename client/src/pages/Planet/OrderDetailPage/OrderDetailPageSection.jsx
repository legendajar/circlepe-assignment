import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSignIcon, Package2, User2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import useGetSingleOrder from '@/hooks/useGetSingleOrder'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'

const OrderDetailsPageSection = () => {
  const params = useParams()
  const orderId = params.id
  useGetSingleOrder(orderId)

  const order = useSelector(store => store.order.singleOrder)

  return (
    <div className='w-full h-full p-6'>
      <div className='flex flex-col gap-5 p-6 border rounded-md shadow-lg bg-white'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold font-titleFonts text-gray-700'>Order Details</h1>
          <span className='text-sm font-medium text-green-500'>
            Order #{order._id}
          </span>
        </div>

        <hr className='my-3 border-gray-200' />

        <div className='grid grid-cols-2 gap-5'>
          {/* Order Information Section */}
          <div className='flex flex-col gap-3 border p-4 rounded-md shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <Package2 /> Order Information
            </h2>
            <p>Order Id: <strong>{order._id}</strong></p>
            <p>Order Date: <strong>{order.order_date}</strong></p>
            <p>Order Status: <strong>{order.product[0].order_status}</strong></p>
            <p>Expected Delivery: <strong>12/08/2024</strong></p>
          </div>

          {/* Buyer Information Section */}
          <div className='flex flex-col gap-3 border p-4 rounded-md shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <User2 /> Buyer Information
            </h2>
            <p>Buyer: <strong>{order.address.name}</strong></p>
            <p>Address: {order.address.firstLine} {order.address.secondLine}, {order.address.city}, {order.address.state}, {order.address.country} {order.address.pincode} </p>
            <p>Mobile: <strong>{order.address.mobile}</strong></p>
          </div>

          {/* Product Information Section */}
          <div className='col-span-2'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  order.product.map((prod, index) => (
                    <TableRow key={index}>
                      <TableCell>ABCD</TableCell>
                      <TableCell>{prod.quantity}</TableCell>
                      <TableCell>Rs. {prod.product_price}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>

          {/* Payment Information Section */}
          <div className='flex flex-col gap-3 border p-4 rounded-md shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <DollarSignIcon /> Payment Information
            </h2>
            <p>Payment Method: <strong>{order.payment_method}</strong></p>
            <p>Total Price: <strong>Rs. {order.total_price}</strong></p>
            <p>Transaction ID: <strong>#{order.transaction_id}</strong></p>
          </div>
        </div>

        {/* One-Time Update Order Status Button */}
        <div className='flex gap-5 justify-end mt-5'>
          <Button className='bg-red-500 hover:bg-red-500'>Cancel Order</Button>
          <Button className='px-5 py-2 rounded-md text-white shadow-md bg-green-500 hover:bg-green-500'>Accept Order</Button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPageSection
