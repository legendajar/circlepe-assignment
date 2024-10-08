import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetProductByPlanet from "@/hooks/useGetProductByPlanet";
import { PRODUCT_API_END_POINT } from "@/utils/URLS";
import axios from "axios";
import { PenBoxIcon, Trash2Icon, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlanetProductListSection = () => {
  const [refresh, setRefresh] = useState(false);
  const { user } = useSelector((store) => store.planet);
  useGetProductByPlanet(refresh, user._id);
  const productList = useSelector((store) => store.product.planetProductList);
  const navigate = useNavigate()
  const udpateProductHandler = (id) => {
    navigate(`/planet/product/update/${id}`)
  }
  const deleteProductHandler = async (id) => {
    try {
      if (!id) {
        alert("Error getting Id, Please contact intergalatic store");
      }
      const res = await axios.delete(`${PRODUCT_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        alert(res.data.message);
        setRefresh(!refresh);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error Deleting Product, Please contact intergalatic store");
    }
  };
  return (
    <div className="w-full h-full p-3">
      <div className="flex flex-col gap-5 p-5 border rounded-md shadow-md">
        <div className="flex items-center justify-between gap-5">
          <h1 className="text-lg font-bold font-titleFonts">Products</h1>
          <Input
            type="text"
            className="w-2/5"
            placeholder="Enter Product Name or Product ID"
          />
        </div>
        <hr className="my-2" />
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black text-left">
                  S.No
                </TableHead>
                <TableHead className="font-bold text-black text-center">
                  Name
                </TableHead>
                <TableHead className="font-bold text-black text-center">
                  Price
                </TableHead>
                <TableHead className="font-bold text-black text-center">
                  Stock
                </TableHead>
                <TableHead className="font-bold text-black text-center">
                  Category
                </TableHead>
                <TableHead className="font-bold text-black text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList && productList.length > 0 ? (
                productList.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left">{index + 1}</TableCell>
                    <TableCell className="text-center">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.stock}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <Button className="bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300 transition-all">
                            View Detail
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-48">
                          <div className="flex flex-col gap-4">
                            {/* Edit Button */}
                            <Button onClick={() => udpateProductHandler(product._id)} className="flex items-center gap-3 text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition-all">
                              <PenBoxIcon className="w-5 h-5 text-gray-600" />
                              Edit
                            </Button>

                            {/* Delete Button with AlertDialog */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button className="flex items-center gap-3 text-red-600 bg-red-100 hover:bg-red-200 p-2 rounded-md transition-all">
                                  <Trash2Icon className="w-5 h-5 text-red-500" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-lg font-semibold text-gray-800">
                                    Are you sure you want to delete this
                                    product?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-sm text-gray-600">
                                    This action cannot be undone. Deleting the
                                    product will remove it from our database
                                    permanently.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex justify-end gap-3 mt-4">
                                  {/* Cancel Button */}
                                  <AlertDialogCancel className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-all">
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                  </AlertDialogCancel>

                                  {/* Confirm Delete Button */}
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteProductHandler(product._id)
                                    }
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-all"
                                  >
                                    <Trash2Icon className="w-4 h-4" />
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No Data Found{" "}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PlanetProductListSection;
