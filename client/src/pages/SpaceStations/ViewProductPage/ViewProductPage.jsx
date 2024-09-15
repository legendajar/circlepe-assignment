import Navbar from "../shared/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useGetSingleProduct from "@/hooks/useGetSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, addItemToCart } from "@/redux/cartSlice";

const ViewProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  useGetSingleProduct(id);
  const { singleProduct } = useSelector((store) => store.product);
  
  const addCartHandler = (e) => {
    e.preventDefault();

    
    // Add the new product to the cart
    dispatch(addItemToCart(singleProduct));
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
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
