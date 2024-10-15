import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllPlanets from "@/hooks/useGetAllPlanets";
import { useSelector } from "react-redux";
import useGetAllProduct from "@/hooks/useGetAllProduct";
import { Link } from "react-router-dom";


const ListPlanetSection = () => {
  useGetAllPlanets();
  useGetAllProduct();
  const { planetList } = useSelector((store) => store.planet);
  const [searchQuery, setSearchQuery] = useState("")
  // Filter the planet list based on the search query
  const filteredPlanets = planetList
    ? planetList.filter((planet) =>
        planet.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const productList = useSelector(store => store.product. productList)
  const planetProductCount = (planetId) => {
    let count = 0
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].planet_id === planetId) {
        count++
      }
    }
    return count
  }
  return (
    <div className="w-full h-full p-6 bg-white rounded-md shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Planet List</h1>

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
              <TableHead className="p-4 text-center text-gray-600">S.No</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet ID</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Name</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Mobile</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Email</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Product Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlanets && filteredPlanets.length > 0 ? (
              filteredPlanets.map((planet, index) => (
                <TableRow
                  key={planet._id}
                  className={`hover:bg-gray-100 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell className="p-4">{index + 1}</TableCell>
                  <TableCell className="p-4 text-center">
                    <Link to={`/admin/planet/${planet._id}`}>
                      {planet._id}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4 text-center">{planet.name}</TableCell>
                  <TableCell className="p-4 text-center">{planet.mobile}</TableCell>
                  <TableCell className="p-4 text-center">{planet.email}</TableCell>
                  <TableCell className='p-4 text-center'>{planetProductCount(planet._id)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="p-4 text-center text-gray-500">
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

export default ListPlanetSection;
