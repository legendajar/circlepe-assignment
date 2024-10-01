import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "@/utils/URLS.js";
import { useSelector } from "react-redux";

const AddProductSection = () => {
  const [input, setInput] = useState({
    name: "",
    price: null,
    quantity: null,
    category: "",
    description: "",
    file: null,
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setInput({
      ...input,
      [name]: value, // Dynamically update the specific field
    });
  };

  const categoryHandler = (value) => {
    setInput({
      ...input,
      category: value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const { user } = useSelector((store) => store.planet);
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("User Id: ", user._id)

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("price", input.price);
    formData.append("stock", input.quantity);
    formData.append("category", input.category);
    formData.append("description", input.description);
    formData.append("file", input.file);
    formData.append("planet_id", user._id);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const res = await axios.post(`${PRODUCT_API_END_POINT}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        alert(res.data.message);
        setInput({
          name: "",
          price: null,
          quantity: null,
          category: "",
          description: "",
          file: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white border rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Product
        </h1>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </Label>
              <Input
                name="name"
                type="text"
                value={input.name}
                onChange={changeInputHandler}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Product Name"
              />
            </div>
            <div>
              <Label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </Label>
              <Select onValueChange={categoryHandler} className="mt-1">
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shirt">Shirt</SelectItem>
                  <SelectItem value="jeans">Jeans</SelectItem>
                  <SelectItem value="trousers">Trousers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Product Price
              </Label>
              <Input
                name="price"
                type="number"
                value={input.price}
                onChange={changeInputHandler}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Price"
              />
            </div>
            <div>
              <Label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Product Quantity
              </Label>
              <Input
                name="quantity"
                type="number"
                value={input.quantity}
                onChange={changeInputHandler}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Quantity"
              />
            </div>
            <div>
              <Label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image
              </Label>
              <Input
                name="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mb-6">
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              name="description"
              value={input.description}
              onChange={changeInputHandler}
              placeholder="Enter Description Here..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductSection;
