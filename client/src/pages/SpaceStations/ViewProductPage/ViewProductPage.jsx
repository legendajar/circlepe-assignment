import Navbar from "../shared/Navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetSingleProduct from "@/hooks/useGetSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/redux/cartSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "@/components/SpaceStations/ReviewCard/ReviewCard";
import useGetAllProduct from "@/hooks/useGetAllProduct";

const ViewProductPage = () => {
  const params = useParams();
  const id = params.id;
  useGetSingleProduct(id);

  useGetAllProduct();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct } = useSelector((store) => store.product);
  const { productList } = useSelector((store) => store.product);
  const cartItems = useSelector((store) => store.cart.cartItems);
  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item._id === singleProduct._id);
  const addCartHandler = (e) => {
    e.preventDefault();

    // Add the new product to the cart if not already added
    if (!isInCart) {
      dispatch(addItemToCart(singleProduct));
    }
  };

  const buyNowHandler = (e) => {
    e.preventDefault();

    // Redirect to place order page, passing product details via state
    navigate("/order/place", {
      state: { product: singleProduct },
    });
  };
  return (
    <div>
      <Navbar />
      {!singleProduct ? (
        <div>Loading product details...</div>
      ) : (
        <div className="w-full max-w-5xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <img
                src={singleProduct?.image}
                alt={singleProduct?.name}
                className="w-[300px] h-[300px] object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <h1 className="text-3xl font-bold mb-4">{singleProduct.name}</h1>
              <p className="text-lg text-gray-700 mb-4">
                {singleProduct?.description}
              </p>
              <p className="text-xl font-semibold text-gray-900 mb-4">
                Price: ${singleProduct?.price}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={addCartHandler}
                  className={`px-4 py-2 rounded-lg ${
                    isInCart ? "bg-green-500" : "bg-blue-500"
                  } text-white`}
                  disabled={isInCart}
                >
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={buyNowHandler}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ratings & Review */}
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Ratings & Reviews
          </h3>
          <Link to={`/product/rating/add/${singleProduct._id}`}>
            <p>Rate Product</p>
          </Link>
        </div>
        <hr className="mb-8" />
        <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-md">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {singleProduct.ratings && singleProduct.ratings.length > 0 ? (
                singleProduct.ratings.map((rating, index) => (
                  <CarouselItem className="max-w-md" key={index}>
                    <ReviewCard rating={rating} />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="flex justify-center items-center h-64">
                  <p className="text-lg font-semibold text-gray-600">
                    No Ratings Yet
                  </p>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="bg-blue-500 text-white rounded-full p-2" />
            <CarouselNext className="bg-blue-500 text-white rounded-full p-2" />
          </Carousel>
        </div>
      </div>

      <hr className="mx-10 my-3" />

      {/* Similar Product Section */}
      <div className="w-full px-12 flex flex-col gap-5">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Similar Products
        </h3>
        <Carousel
          opts={{
            align: "start",
            loop: true, // Ensure this is supported by your carousel component
          }}
          className="w-full"
        >
          <CarouselContent>
            {productList
              .filter((product) => product.category === singleProduct.category) // Filter for jeans category
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
    </div>
  );
};

export default ViewProductPage;
