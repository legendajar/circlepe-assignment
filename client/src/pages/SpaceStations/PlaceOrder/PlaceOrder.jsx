import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar/Navbar";
import axios from "axios";
import { ORDER_API_END_POINT } from "@/utils/URLS";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/redux/cartSlice";
import useGetSpaceStationById from "@/hooks/useGetSpaceStationById";

const PlaceOrder = ({ singleProduct }) => {
  const spaceStationId = useSelector((store) => store.spaceStation.user._id);
  useGetSpaceStationById(spaceStationId);
  const addresses = useSelector(
    (store) => store.spaceStation.singleSpaceStation.address
  );
  const [orderItems, setOrderItems] = useState([]);
  const cartItemsFromStore = useSelector((store) => store.cart.cartItems);
  const [cartItems, setCartItems] = useState(
    singleProduct ? [singleProduct] : cartItemsFromStore
  );

  const [addressList, setAddressList] = useState([]); // State for saved addresses
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery"); // Default payment method

  const { user } = useSelector((store) => store.spaceStation);
  const deliveryCharge = 50; // Assuming a fixed delivery charge

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    console.log(selectedAddress)
    console.log(paymentMethod)

    try {
      const res = await axios.post(
        `${ORDER_API_END_POINT}/add`,
        {
          name: selectedAddress.name,
          firstLine: selectedAddress.firstLine,
          secondLine: selectedAddress.secondLine,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zip: selectedAddress.pincode,
          mobile: selectedAddress.mobile,
          country: selectedAddress.country,
          total_price: totalPrice,
          delivery_charge: deliveryCharge,
          productList: cartItems,
          user_id: user._id,
          payment_method: paymentMethod,
          delivery_location: selectedAddress.city,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(clearCart());
        window.location.href = res.data.session_url || "/";
      }
    } catch (err) {
      console.log(err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto p-6 flex gap-8">
        {/* Cart Items Section */}
        <div className="w-3/5">
          <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.product_id || item._id}
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
                <div className="text-lg font-bold">
                  ${item.price} x {item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price and Address Form Section */}
        <div className="w-2/5">
          {/* Total Price + Delivery Charge */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-2xl mb-6">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2 border-white">
              Order Total
            </h2>
            <div className="text-xl mb-4 flex justify-between">
              <span>Items Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="text-xl mb-4 flex justify-between">
              <span>Delivery Charges:</span>
              <span>${deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="text-3xl font-bold mt-4 flex justify-between">
              <span>Total:</span>
              <span>${(totalPrice + deliveryCharge).toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address._id} className="flex items-center">
                    <input
                      type="radio"
                      id={address._id}
                      name="address"
                      value={address._id}
                      checked={selectedAddress?._id === address._id}
                      onChange={() => setSelectedAddress(address) }
                      className="mr-2"
                    />
                    <label htmlFor={address._id} className="flex flex-col">
                      <span className="font-bold">{address.name}</span>
                      <span>{`${address.firstLine} ${address.secondLine}, ${address.city}, ${address.state}, ${address.country}, Pin: ${address.pincode}`}</span>
                      <span>Phone: {address.mobile}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No saved addresses found. Please add an address first.</p>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
