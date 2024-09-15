import React from "react";
import Navbar from "../shared/Navbar/Navbar";
import Header from "@/components/SpaceStations/Header/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetAllProduct from "@/hooks/useGetAllProduct";
import { Link } from "react-router-dom";

const Home = () => {
  useGetAllProduct();
  const products = [
    {
      _id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      price: "$19.99",
      image:
        "https://m.media-amazon.com/images/I/41OgB9jk9yL._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      _id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      price: "$29.99",
      image:
        "https://m.media-amazon.com/images/I/51Vyp-omj+L._SX342_SY445_.jpg",
    },
    {
      _id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      price: "$39.99",
      image:
        "https://m.media-amazon.com/images/I/51nLTWR1XqL._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      _id: 4,
      name: "Product 4",
      description: "Description of Product 4",
      price: "$39.99",
      image:
        "https://m.media-amazon.com/images/I/41sQx0KB71L._SY445_SX342_QL70_FMwebp_.jpg",
    },

    {
      _id: 5,
      name: "Product 1",
      description: "Description of Product 1",
      price: "$19.99",
      image:
        "https://m.media-amazon.com/images/I/41OgB9jk9yL._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      _id: 6,
      name: "Product 2",
      description: "Description of Product 2",
      price: "$29.99",
      image:
        "https://m.media-amazon.com/images/I/51Vyp-omj+L._SX342_SY445_.jpg",
    },
    {
      _id: 7,
      name: "Product 3",
      description: "Description of Product 3",
      price: "$39.99",
      image:
        "https://m.media-amazon.com/images/I/51nLTWR1XqL._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      _id: 8,
      name: "Product 4",
      description: "Description of Product 4",
      price: "$39.99",
      image:
        "https://m.media-amazon.com/images/I/41sQx0KB71L._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      _id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      price: "$19.99",
      image:
        "https://m.media-amazon.com/images/I/41OgB9jk9yL._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      _id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      price: "$29.99",
      image:
        "https://m.media-amazon.com/images/I/51Vyp-omj+L._SX342_SY445_.jpg",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-5">
        <div className="w-full flex justify-center mt-10 px-12">
          <Header />
        </div>
        <div className="w-full px-12 flex flex-col gap-5">
          <p className="font-bold font-titleFonts">Mars Items</p>
          <Carousel
            opts={{
              align: "start",
              loop: true, // Ensure this is supported by your carousel component
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <Link to={`/product/view/${product._id}`} key={product._id} className="md:basis-1/2 lg:basis-1/3 flex-shrink-0">
                  <CarouselItem>
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
                </Link>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-full px-12 flex flex-col gap-5">
          <p className="font-bold font-titleFonts">Mars Items</p>
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
        <div className="w-full px-12 flex flex-col gap-5">
          <p className="font-bold font-titleFonts">Mars Items</p>
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
    </div>
  );
};

export default Home;
