import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import useGetSpaceStationById from "@/hooks/useGetSpaceStationById";
import useGetOrderBySpaceStation from "@/hooks/useGetOrderBySpaceStation";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const SpaceStationProfilePageSection = () => {
    const [refresh, setRefresh] = useState(false)
  const params = useParams();
  const id = params.id
  useGetSpaceStationById(id, refresh)
  useGetOrderBySpaceStation(id)

  const spaceStation = useSelector(store => store.spaceStation.user)

  // Static Data for Orders
  const orders = [
    {
      _id: "O12345",
      createdAt: "2024-01-01T10:00:00Z",
      totalItems: 5,
      totalPrice: 1500,
      status: "Delivered",
    },
    {
      _id: "O12346",
      createdAt: "2024-02-15T14:00:00Z",
      totalItems: 2,
      totalPrice: 800,
      status: "Pending",
    },
    {
      _id: "O12347",
      createdAt: "2024-03-10T16:30:00Z",
      totalItems: 7,
      totalPrice: 2100,
      status: "Shipped",
    },
  ];

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
          <p className="text-lg font-bold text-gray-800">{spaceStation.mobile}</p>
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

        {orders && orders.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-md shadow-lg">
            <Table className="min-w-full text-left border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
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
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <TableCell className="px-6 py-4 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-4">{order.totalItems}</TableCell>
                    <TableCell className="px-6 py-4">${order.totalPrice}</TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
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
