import useGetPlanetById from "@/hooks/useGetPlanetById";
import useGetProductByPlanet from "@/hooks/useGetProductByPlanet";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PlanetProfilePageSection = () => {
  const [refresh, setRefresh] = useState(false)
  const params = useParams();
  const planetId = params.id;
  useGetPlanetById(planetId);
  useGetProductByPlanet(refresh, planetId);

  const planet = useSelector((store) => store.planet.singlePlanet);
  const products = useSelector((store) => store.product.planetProductList);

  return (
    <div className="w-full max-w-6xl mx-auto h-full p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg">
      {/* Planet Information Section */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Planet Profile - {planet.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Planet Name:</span>
          <p className="text-lg font-bold text-gray-800">{planet.name}</p>
        </div>
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Planet Mobile:</span>
          <p className="text-lg font-bold text-gray-800">{planet.mobile}</p>
        </div>
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Planet Email:</span>
          <p className="text-lg font-bold text-gray-800">{planet.email}</p>
        </div>
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Planet Created Date:</span>
          <p className="text-lg font-bold text-gray-800">
            {new Date(planet.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="p-6 bg-white rounded-md shadow-lg">
          <span className="text-gray-500 font-medium">Planet ID:</span>
          <p className="text-lg font-bold text-gray-800">{planet._id}</p>
        </div>
      </div>

      {/* Planet Products Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Planet Products
        </h2>

        {products && products.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-md shadow-lg">
            <Table className="min-w-full text-left border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    S.No
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Product Image
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Product Name
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Category
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Price
                  </TableHead>
                  <TableHead className="px-6 py-4 text-gray-700 font-semibold">
                    Stock
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={product._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <TableCell className="px-6 py-4 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4"><Link to={`/admin/product/${product._id}`}>{product.name}</Link></TableCell>
                    <TableCell className="px-6 py-4">{product.category}</TableCell>
                    <TableCell className="px-6 py-4">${product.price}</TableCell>
                    <TableCell className="px-6 py-4">{product.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 text-center text-gray-500 rounded-md shadow-sm">
            No products available for this planet.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetProfilePageSection;
