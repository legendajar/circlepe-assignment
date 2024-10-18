import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllOrder from "@/hooks/useGetAllOrder";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListOrderSection = () => {
  useGetAllOrder();
  const { orderList } = useSelector((store) => store.order);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Filtered orders based on search term
  const filteredOrders = orderList?.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(searchLower) ||
      order.transaction_id.toLowerCase().includes(searchLower) ||
      order.payment_method.toLowerCase().includes(searchLower) ||
      order.transaction_status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full h-full rounded-md shadow-xl p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order List</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID, Transaction ID, or Payment Method"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/3"
        />
      </div>
      <div className="overflow-hidden">
        <Table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="p-4 text-left text-gray-600">S.No</TableHead>
              <TableHead className="p-4 text-left text-gray-600">Order ID</TableHead>
              <TableHead className="p-4 text-left text-gray-600">Transaction ID</TableHead>
              <TableHead className="p-4 text-left text-gray-600">Payment Method</TableHead>
              <TableHead className="p-4 text-left text-gray-600">Transaction Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <TableCell className="p-4">{index + 1}</TableCell>
                  <TableCell className="p-4">
                    <Link to={`/admin/spacestation/order/${order._id}`}>
                      {order._id}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4">{order.transaction_id}</TableCell>
                  <TableCell className="p-4">{order.payment_method}</TableCell>
                  <TableCell className="p-4">{order.transaction_status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="p-6 text-center text-gray-500 font-semibold">
                  No Records Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListOrderSection;
