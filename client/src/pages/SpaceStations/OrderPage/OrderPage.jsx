import React, { useState } from "react";
import Navbar from "../shared/Navbar/Navbar";

const OrderPage = () => {
  const products = [
    {
      id: "1",
      name: "Product 1",
      description: "Description for Product 1",
      price: "29.99",
      image: "https://via.placeholder.com/300x300?text=Product+1",
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description for Product 2",
      price: "39.99",
      image: "https://via.placeholder.com/300x300?text=Product+2",
    },
    // Add more products as needed
  ];

  // State to manage the quantities of each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  // Calculate total price for items
  const calculateItemPrice = () => {
    return products.reduce((total, product) => {
      return total + (quantities[product.id] || 0) * parseFloat(product.price);
    }, 0);
  };

  // Calculate total price including shipping
  const calculateTotalPrice = () => {
    return (calculateItemPrice() + 15.0).toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value,
    });
  };

  // Handle increment/decrement
  const adjustQuantity = (productId, amount) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(
        0,
        (prevQuantities[productId] || 0) + amount
      );
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = products.map((product) => ({
      ...product,
      quantity: quantities[product.id] || 0,
    }));
    console.log("Order details:", orderDetails);
    // Handle order submission (e.g., send data to server)
  };

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Product List */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-6">Orders</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row gap-6 mb-6 border p-4 rounded-lg shadow-lg"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <h2 className="text-2xl font-semibold mb-2">
                    {product.name}
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-semibold text-gray-900 mb-4">
                    Price: ${product.price}
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => adjustQuantity(product.id, -1)}
                      className="bg-gray-300 text-gray-800 p-2 rounded-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      min="0"
                      value={quantities[product.id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                    />
                    <button
                      type="button"
                      onClick={() => adjustQuantity(product.id, 1)}
                      className="bg-gray-300 text-gray-800 p-2 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Total Price Box */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span className="text-lg">Subtotal:</span>
            <span className="text-xl font-semibold">
              ${calculateItemPrice().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg">Shipping:</span>
            <span className="text-xl font-semibold">$15.00</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg">Total Price:</span>
            <span className="text-xl font-semibold">
              ${calculateTotalPrice()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
