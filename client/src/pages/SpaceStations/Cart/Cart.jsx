import React from "react";
import Navbar from "../shared/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
} from "@/redux/cartSlice";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cartItems);

  // Update the quantity of an item in the cart
  const updateQuantity = (item, change) => {
    if (change === 1) {
      // Ensure the quantity doesn't exceed available stock
      if (item.quantity < item.stock) {
        dispatch(addItemToCart(item));
      } else {
        alert("Cannot add more items than available stock");
      }
    } else if (change === -1) {
      // Decrease the quantity or remove item if quantity is 0
      if (item.quantity > 1) {
        dispatch(decreaseItemQuantity(item._id));
      } else {
        dispatch(removeItemFromCart(item));
      }
    }
  };

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate()
  const handlePlaceOrderClick = () => {
    navigate('/order/place');
  };
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-5xl mx-auto p-6 flex gap-6">
        {/* Cart items section */}
        <div className="w-full flex-1">
          <h1 className="text-3xl font-bold mb-4">Cart</h1>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b-2 pb-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Decrease quantity button */}
                  <button
                    onClick={() => updateQuantity(item, -1)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold">{item.quantity}</span>
                  {/* Increase quantity button */}
                  <button
                    onClick={() => updateQuantity(item, 1)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total price section */}
        <div className="w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2 border-white">
            Total Price
          </h2>
          <p className="text-4xl font-extrabold mb-6">
            ${totalPrice.toFixed(2)}
          </p>
          <button onClick={handlePlaceOrderClick} className="w-full bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
