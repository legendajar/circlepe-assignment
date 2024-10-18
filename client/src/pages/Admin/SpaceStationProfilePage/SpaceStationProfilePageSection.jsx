import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useParams } from "react-router-dom";
import useGetSpaceStationById from "@/hooks/useGetSpaceStationById";
import useGetOrderBySpaceStation from "@/hooks/useGetOrderBySpaceStation";
import { useSelector } from "react-redux";

const SpaceStationProfilePageSection = () => {
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const params = useParams();
  const id = params.id;
  useGetSpaceStationById(id, refresh);
  useGetOrderBySpaceStation(id);

  const spaceStation = useSelector((store) => store.spaceStation.singleSpaceStation);
  const orders = useSelector((store) => store.order.orderListSpaceStation);

  // Filtered orders based on search term
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto h-full p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg">
      {/* SpaceStation Information Section */}
      <div className="flex flex-col items-center mb-10">
        {/* SpaceStation Image */}
        <img
          src={spaceStation.image}
          alt={spaceStation.name}
          className="h-40 w-40 object-cover rounded-full shadow-md mb-4"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
          {spaceStation.name}
        </h1>
        <p className="text-gray-500 text-lg">
          Established on {new Date(spaceStation.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* SpaceStation Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Mobile:</span>
          <p className="text-lg font-bold text-gray-800">
            {spaceStation.mobile}
          </p>
        </div>
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Email:</span>
          <p className="text-lg font-bold text-gray-800">{spaceStation.email}</p>
        </div>
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">SpaceStation ID:</span>
          <p className="text-lg font-bold text-gray-800">{spaceStation._id}</p>
        </div>
      </div>

      {/* SpaceStation Orders Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Order History
        </h2>

        {/* Search Box */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Order No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-md shadow-lg">
            <Table className="min-w-full text-left border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    S.No
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Order No
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Order Date
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Total Items
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Total Price
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <TableCell className="px-6 py-4 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-6 py-4"><Link to={`/admin/spacestation/order/${order._id}`}>
                    {order._id}
                    </Link></TableCell>
                    <TableCell className="px-6 py-4">
                      {new Date(order.order_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {order.product.length}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      ${order.total_price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 text-center text-gray-500 rounded-md shadow-sm">
            No orders available for this SpaceStation.
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceStationProfilePageSection;
