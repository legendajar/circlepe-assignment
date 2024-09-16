import Navbar from "../shared/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useGetSingleProduct from "@/hooks/useGetSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, addItemToCart } from "@/redux/cartSlice";

const ViewProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  useGetSingleProduct(id);
  const { singleProduct } = useSelector((store) => store.product);
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
      state: { product: singleProduct }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={singleProduct.image}
              alt={singleProduct.name}
              className="w-[300px] h-[300px] object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <h1 className="text-3xl font-bold mb-4">{singleProduct.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{singleProduct.description}</p>
            <p className="text-xl font-semibold text-gray-900 mb-4">
              Price: ${singleProduct.price}
            </p>
            <div className="flex gap-4">
              <button
                onClick={addCartHandler}
                className={`px-4 py-2 rounded-lg ${
                  isInCart ? "bg-green-500" : "bg-blue-500"
                } text-white`}
                disabled={isInCart} // Disable the button if the product is already in the cart
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
    </div>
  );
};

export default ViewProductPage;
