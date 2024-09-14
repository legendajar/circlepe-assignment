import React from "react";
import Navbar from "../shared/Navbar/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ViewProductPage = () => {
  // Hardcoded product details
  const product = {
    id: "12345",
    name: "Sample Product",
    description:
      "This is a detailed description of the sample product. It provides information about the features and benefits of the product.",
    price: "29.99",
    image: "https://via.placeholder.com/1200x350?text=Sample+Product", // Replace with your product image URL
  };

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      price: "$19.99",
      image: "https://via.placeholder.com/300x200?text=Product+1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      price: "$29.99",
      image: "https://via.placeholder.com/300x200?text=Product+2",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      price: "$39.99",
      image: "https://via.placeholder.com/300x200?text=Product+3",
    },
    {
        id: 4,
        name: "Product 4",
        description: "Description of Product 4",
        price: "$39.99",
        image: "https://via.placeholder.com/300x200?text=Product+4",
      },
    // Add more products as needed
  ];
  return (
    
    <div>
        <Navbar />
        <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-[300px] h-[300px] object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mb-4">
            Price: ${product.price}
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Add to Cart
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
        </div>

        <div className="w-full px-12 flex flex-col gap-5">
          <p className="font-bold font-titleFonts">View Similar Items</p>
          <Carousel
            opts={{
              align: "start",
              loop: true, // Ensure this is supported by your carousel component
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent
                        className="flex flex-col items-center justify-between p-4"
                        style={{ height: "300px" }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="text-center mt-2">
                          <h3 className="text-xl font-semibold">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.description}
                          </p>
                          <span className="text-lg font-bold mt-2">
                            {product.price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
    </div>
  );
};

export default ViewProductPage;
