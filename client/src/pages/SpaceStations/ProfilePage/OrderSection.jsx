import React from 'react'

const OrderSection = () => {
  return (
    <div>
        <div className="p-6 bg-white shadow-md rounded-md w-full mx-auto mb-6">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Order: Abcd</h2>
          <p className="text-gray-600">Order Date: 25/09/2023</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Expected Delivery: 24/09/2024</p>
          <p className='text-green-600'>
            Delivered
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-gray-500">Product Name</span>
          <span className="text-lg font-medium">ABCD</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Order Price</span>
          <span className="text-lg font-medium">$ 500</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Current Location</span>
          <span className="text-lg font-medium">Etawah</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Delivery Status</span>
          <span className='text-green-600'>
            Delivered
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Payment Type</span>
          <span className="text-lg font-medium">COD</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Payment Status</span>
          <span className='text-green-600'>
            Payment Done
          </span>
        </div>
      </div>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md w-full mx-auto mb-6">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Order: Abcd</h2>
          <p className="text-gray-600">Order Date: 25/09/2023</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Expected Delivery: 24/09/2024</p>
          <p className='text-green-600'>
            Delivered
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-gray-500">Product Name</span>
          <span className="text-lg font-medium">ABCD</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Order Price</span>
          <span className="text-lg font-medium">$ 500</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Current Location</span>
          <span className="text-lg font-medium">Etawah</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Delivery Status</span>
          <span className='text-green-600'>
            Delivered
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Payment Type</span>
          <span className="text-lg font-medium">COD</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Payment Status</span>
          <span className='text-green-600'>
            Payment Done
          </span>
        </div>
      </div>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md w-full mx-auto mb-6">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Order: Abcd</h2>
          <p className="text-gray-600">Order Date: 25/09/2023</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Expected Delivery: 24/09/2024</p>
          <p className='text-green-600'>
            Delivered
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-gray-500">Product Name</span>
          <span className="text-lg font-medium">ABCD</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Order Price</span>
          <span className="text-lg font-medium">$ 500</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Current Location</span>
          <span className="text-lg font-medium">Etawah</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Delivery Status</span>
          <span className='text-green-600'>
            Delivered
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Payment Type</span>
          <span className="text-lg font-medium">COD</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Payment Status</span>
          <span className='text-green-600'>
            Payment Done
          </span>
        </div>
      </div>
        </div>
    </div>
  )
}

export default OrderSection