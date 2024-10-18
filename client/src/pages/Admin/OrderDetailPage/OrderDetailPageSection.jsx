import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetSingleOrder from "@/hooks/useGetSingleOrder";
import { BadgeCheckIcon, CreditCardIcon, TruckIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetailPageSection = () => {
  const [refresh, setRefresh] = useState(false)
  const params = useParams();
  const orderId = params.id 

  useGetSingleOrder(refresh, orderId)
  const orderDetails = useSelector((store) => store.order.singleOrder);
  return (
    <div className="w-full h-full rounded-md shadow-xl p-6 bg-gray-50">
      <h1 className="text-2xl font-titleFonts font-bold mb-6">Order Details</h1>
      
      {/* Flex Container for Order Info and Shipping Address */}
      <div className="flex flex-wrap justify-between mb-8">
        {/* Order Information Section */}
        <div className="flex-1 bg-white p-4 rounded-md shadow mr-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <BadgeCheckIcon className="mr-2 text-green-600" /> Order Information
          </h2>
          <p>Order ID: <span className="font-medium">{orderDetails._id}</span></p>
          <p>Order Date: <span className="font-medium">{new Date(orderDetails.order_date).toLocaleDateString()}</span></p>
          <p>Total Price: <span className="font-medium">{orderDetails.total_price}</span></p>
          <p>
            Payment Method: <span className="font-medium">{orderDetails.payment_method}</span>
            <CreditCardIcon className="inline-block ml-2 text-blue-600" />
          </p>
          <p>Transaction ID: <span className="font-medium">{orderDetails.transaction_id}</span></p>
          <p>Transaction Status: <span className="font-medium text-green-600">{orderDetails.transaction_status}</span></p>
        </div>

        {/* Shipping Address Section */}
        <div className="flex-1 bg-white p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <TruckIcon className="mr-2 text-yellow-600" /> Shipping Address
          </h2>
          <p><strong>Name:</strong> {orderDetails.address.name}</p>
          <p><strong>Address:</strong> {orderDetails.address.firstLine}, {orderDetails.address.secondLine}</p>
          <p><strong>City:</strong> {orderDetails.address.city}</p>
          <p><strong>State:</strong> {orderDetails.address.state}</p>
          <p><strong>Country:</strong> {orderDetails.address.country}</p>
          <p><strong>Pincode:</strong> {orderDetails.address.pincode}</p>
          <p><strong>Mobile:</strong> {orderDetails.address.mobile}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Product Details</h2>
      <Table className="rounded-lg overflow-hidden border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 bg-gray-200">S.No</TableHead>
            <TableHead className="w-1/6 bg-gray-200">Product Image</TableHead>
            <TableHead className="w-1/2 bg-gray-200">Name</TableHead>
            <TableHead className="w-1/6 bg-gray-200">Price</TableHead>
            <TableHead className="w-1/6 bg-gray-200">Quantity</TableHead>
            <TableHead className="w-1/6 bg-gray-200">Order Status</TableHead>
            <TableHead className="w-1/6 bg-gray-200">Delivery Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetails.product && orderDetails.product.length > 0 ? (
            orderDetails.product.map((product, index) => (
              <TableRow key={product.productId} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img src={product.product_id.image} alt={product.product_id.name} className="w-16 h-16 object-cover" />
                </TableCell>
                <TableCell>{product.product_id.name}</TableCell>
                <TableCell>{product.product_id.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.order_status}</TableCell>
                <TableCell>{new Date(product.expected_delivery_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No Products Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderDetailPageSection;
