import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSignIcon, Package2, User2 } from "lucide-react";
import { useParams } from "react-router-dom";
import useGetSingleOrder from "@/hooks/useGetSingleOrder";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const OrderDetailsPageSection = () => {
  const params = useParams();
  const orderId = params.id;
  useGetSingleOrder(orderId);
  const order = useSelector((store) => store.order.singleOrder);
  const user = useSelector((store) => store.planet.user);
  return (
    <div className="w-full h-full p-6">
      <div className="flex flex-col gap-5 p-6 border rounded-md shadow-lg bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold font-titleFonts text-gray-700">
            Order Details
          </h1>
          <span className="text-sm font-medium text-green-500">
            Order #{order._id}
          </span>
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="grid grid-cols-2 gap-5">
          {/* Order Information Section */}
          <div className="flex flex-col gap-3 border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Package2 /> Order Information
            </h2>
            <p>
              Order Id: <strong>{order._id}</strong>
            </p>
            <p>
              Order Date: <strong>{order.order_date}</strong>
            </p>
            <p>
              Order Status: <strong>{order.product[0].order_status}</strong>
            </p>
            <p>
              Expected Delivery: <strong>12/08/2024</strong>
            </p>
          </div>

          {/* Buyer Information Section */}
          <div className="flex flex-col gap-3 border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <User2 /> Buyer Information
            </h2>
            <p>
              Buyer: <strong>{order.address.name}</strong>
            </p>
            <p>
              Address: {order.address.firstLine} {order.address.secondLine},{" "}
              {order.address.city}, {order.address.state},{" "}
              {order.address.country} {order.address.pincode}{" "}
            </p>
            <p>
              Mobile: <strong>{order.address.mobile}</strong>
            </p>
          </div>

          {/* Product Information Section */}
          <div className="col-span-2">
            <Table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Product Image
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Product Name
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.product.map((prod, index) =>
                  prod.product_id.planet_id === user._id ? (
                    <TableRow key={prod.product_id} className="border-b">
                      <TableCell className="px-4 py-3">
                        <img
                          src={prod.product_id.image}
                          alt={prod.product_id.name}
                          className="h-16 w-16 object-cover rounded-md border"
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-800">
                        {prod.product_id.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-800">
                        {prod.quantity}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-800">
                        Rs. {prod.product_id.price || "N/A"}
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </div>

          {/* Payment Information Section */}
          <div className="flex flex-col gap-3 border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <DollarSignIcon /> Payment Information
            </h2>
            <p>
              Payment Method: <strong>{order.payment_method}</strong>
            </p>
            <p>
              Total Price: <strong>Rs. {order.total_price}</strong>
            </p>
            <p>
              Transaction ID: <strong>#{order.transaction_id}</strong>
            </p>
          </div>
        </div>

        {/* One-Time Update Order Status Button */}
        <div className="flex gap-5 justify-end mt-5">
          <Button className="bg-red-500 hover:bg-red-500">Cancel Order</Button>
          <Button className="px-5 py-2 rounded-md text-white shadow-md bg-green-500 hover:bg-green-500">
            Accept Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPageSection;
