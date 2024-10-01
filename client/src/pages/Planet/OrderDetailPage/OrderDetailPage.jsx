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

const OrderDetailsPage = () => {
  // State to track if the order status has been updated
  const [isUpdated, setIsUpdated] = useState(false)

  // Function to handle the status update
  const handleUpdateStatus = () => {
    // Logic to update the order status goes here (e.g., API call)
    console.log("Order status updated!")

    // Set the state to true to disable the button after one-time use
    setIsUpdated(true)
  }

  return (
    <div className='w-full h-full p-6'>
      <div className='flex flex-col gap-5 p-6 border rounded-md shadow-lg bg-white'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold font-titleFonts text-gray-700'>Order Details</h1>
          <span className='text-sm font-medium text-green-500'>
            Order #123
          </span>
        </div>

        <hr className='my-3 border-gray-200' />

        <div className='grid grid-cols-2 gap-5'>
          {/* Order Information Section */}
          <div className='flex flex-col gap-3 border p-4 rounded-md shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <Package2 /> Order Information
            </h2>
            <p>Order Number: <strong>1233</strong></p>
            <p>Order Date: <strong>11/08/2024</strong></p>
            <p>Order Status: <strong>Pending</strong></p>
            <p>Expected Delivery: <strong>12/08/2024</strong></p>
          </div>

          {/* Buyer Information Section */}
          <div className='flex flex-col gap-3 border p-4 rounded-md shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <User2 /> Buyer Information
            </h2>
            <p>Buyer: <strong>Harsh Solanki</strong></p>
            <p>Address: H.No-7, Sabitganj, Etawah</p>
            <p>Mobile: <strong>+91 8869074696</strong></p>
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
                <TableRow>
                  <TableCell>ABCD</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$250</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Payment Information Section */}
          <div className='flex flex-col gap-3 border p-4 rounded-md shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
              <DollarSignIcon /> Payment Information
            </h2>
            <p>Payment Method: <strong>CARD</strong></p>
            <p>Total Price: <strong>$1250</strong></p>
            <p>Transaction ID: <strong>#123456789</strong></p>
          </div>
        </div>

        {/* One-Time Update Order Status Button */}
        <div className='flex justify-end mt-5'>
          <button
            className={`px-5 py-2 rounded-md shadow-md text-white ${
              isUpdated ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={handleUpdateStatus}
            disabled={isUpdated}  // Disable button after update
          >
            {isUpdated ? 'Order Status Updated' : 'Update Order Status'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
