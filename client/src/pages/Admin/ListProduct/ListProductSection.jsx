import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllProduct from "@/hooks/useGetAllProduct";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListProductSection = () => {
  useGetAllProduct();
  const { productList } = useSelector((store) => store.product);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Filtered products based on search term
  const filteredProducts = productList?.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.planet_id.name.toLowerCase().includes(searchLower) ||
      product.planet_id.email.toLowerCase().includes(searchLower) ||
      product.planet_id.mobile.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full h-full rounded-md shadow-xl p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by product or planet details"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/3"
        />
      </div>
      <div className="w-full overflow-hidden"> {/* Changed to overflow-hidden */}
        <Table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-4 text-left text-gray-600">S.No</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Product ID</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Product Image</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Product Name</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Product Category</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet ID</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Name</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Email</TableHead>
              <TableHead className="p-4 text-center text-gray-600">Planet Mobile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell className="p-4">{index + 1}</TableCell>
                  <TableCell className="p-4">
                    <Link to={`/admin/product/${product._id}`}>
                      {product._id}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md shadow-sm border"
                    />
                  </TableCell>
                  <TableCell className="p-4">{product.name}</TableCell>
                  <TableCell className="p-4">{product.category}</TableCell>
                  <TableCell className="p-4">{product.planet_id._id}</TableCell>
                  <TableCell className="p-4">{product.planet_id.name}</TableCell>
                  <TableCell className="p-4">{product.planet_id.email}</TableCell>
                  <TableCell className="p-4">{product.planet_id.mobile}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="p-6 text-center text-gray-500 font-semibold"
                >
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

export default ListProductSection;
