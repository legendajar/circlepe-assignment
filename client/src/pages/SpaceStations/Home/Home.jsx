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
import { useSelector } from "react-redux";

const Home = () => {
  useGetAllProduct();
  const { productList } = useSelector((store) => store.product);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-5">
        <div className="w-full flex justify-center mt-10 px-12">
          <Header />
        </div>
        <div className="w-full px-12 flex flex-col gap-5">
          <p className="font-bold font-titleFonts">Mars Items - Jeans</p>
          <Carousel
            opts={{
              align: "start",
              loop: true, // Ensure this is supported by your carousel component
            }}
            className="w-full"
          >
            <CarouselContent>
              {productList
                .filter((product) => product.category === "jeans") // Filter for jeans category
                .map((product) => (
                  <Link
                    to={`/product/view/${product._id}`}
                    key={product._id}
                    className="md:basis-1/2 lg:basis-1/3 flex-shrink-0"
                  >
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
  <p className="font-bold font-titleFonts">Mars Items - Jeans</p>
  <Carousel
    opts={{
      align: "start",
      loop: true, // Ensure this is supported by your carousel component
    }}
    className="w-full"
  >
    <CarouselContent>
      {productList
        .filter((product) => product.category === 'trousers')  // Filter for jeans category
        .map((product) => (
          <Link
            to={`/product/view/${product._id}`}
            key={product._id}
            className="md:basis-1/2 lg:basis-1/3 flex-shrink-0"
          >
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
                      <h3 className="text-xl font-semibold">{product.name}</h3>
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
  <p className="font-bold font-titleFonts">Mars Items - Jeans</p>
  <Carousel
    opts={{
      align: "start",
      loop: true, // Ensure this is supported by your carousel component
    }}
    className="w-full"
  >
    <CarouselContent>
      {productList
        .filter((product) => product.category === 'shirts')  // Filter for jeans category
        .map((product) => (
          <Link
            to={`/product/view/${product._id}`}
            key={product._id}
            className="md:basis-1/2 lg:basis-1/3 flex-shrink-0"
          >
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
                      <h3 className="text-xl font-semibold">{product.name}</h3>
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

      </div>
    </div>
  );
};

export default Home;
