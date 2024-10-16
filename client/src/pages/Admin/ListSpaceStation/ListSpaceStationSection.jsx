import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllSpaceStation from "@/hooks/useGetAllSpaceStation";
import { useSelector } from "react-redux";
import useGetAllOrder from "@/hooks/useGetAllOrder";
import { Link } from "react-router-dom";

const ListSpaceStationSection = () => {
    useGetAllSpaceStation();
    useGetAllOrder();
    const { spaceStationList } = useSelector((store) => store.spaceStation);
    const orderList = useSelector(store => store.order.orderList)

    const [searchQuery, setSearchQuery] = useState("");
    const filteredSpaceStations = spaceStationList
        ? spaceStationList.filter((station) =>
            station.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const spaceStationCount = (spaceStationId) => {
        let count = 0;
        orderList.forEach((order) => {
            if (order.user_id._id === spaceStationId) {
                count++;
            }
        });
        return count;
    }

  return (
    <div className="w-full h-full p-6 bg-white rounded-md shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Space Station List
      </h1>

      {/* Search Input */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => setSearchQuery("")}
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-4 text-left text-gray-600">S.No</TableHead>
              <TableHead className="p-4 text-center text-gray-600">ID</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Name</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Email</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Mobile</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Order Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpaceStations && filteredSpaceStations.length > 0 ? (
              filteredSpaceStations.map((spaceStation, index) => (
                <TableRow
                  key={spaceStation._id}
                  className={`hover:bg-gray-100 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell className="p-4">{index + 1}</TableCell>
                  <TableCell className="p-4 text-center">
                  <Link to={`/admin/spacestation/${spaceStation._id}`}>
                  {spaceStation._id}
                  </Link></TableCell>
                  <TableCell className="p-4 text-center">{spaceStation.name}</TableCell>
                  <TableCell className="p-4 text-center">{spaceStation.email}</TableCell>
                  <TableCell className="p-4 text-center">{spaceStation.mobile}</TableCell>
                  <TableCell className="p-4 text-center">{spaceStationCount(spaceStation._id)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="p-4 text-center text-gray-500">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListSpaceStationSection;
