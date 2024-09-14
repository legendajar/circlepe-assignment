import React from "react";
import Navbar from "../shared/Navbar/Navbar";

const ViewOrderPage = () => {
  // Static data for demonstration
  const orders = [
    {
      id: "001",
      products: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 1 },
      ],
      totalPrice: 89.97,
      date: "2024-09-14T12:00:00Z",
      status: "Shipped",
      currentLocation: "Warehouse in New York",
    },
    {
      id: "002",
      products: [
        { name: "Product 3", quantity: 1 },
        { name: "Product 4", quantity: 3 },
      ],
      totalPrice: 139.95,
      date: "2024-09-13T08:00:00Z",
      status: "Delivered",
      currentLocation: "Delivered to Los Angeles",
    },
    {
      id: "003",
      products: [
        { name: "Product 5", quantity: 2 },
        { name: "Product 6", quantity: 2 },
      ],
      totalPrice: 119.98,
      date: "2024-09-12T15:00:00Z",
      status: "Pending",
      currentLocation: "In Transit",
    },
    // Add more static orders as needed
  ];

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">View Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Order ID: {order.id}
                </h2>

                {/* Order Summary */}
                <p className="text-lg text-gray-800 mb-4">
                  <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </p>
                <p className="text-lg text-gray-500 mb-4">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-medium mb-4">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-white rounded-full ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </p>

                {/* Current Location */}
                <div className="bg-yellow-100 p-4 rounded-md mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Current Location
                  </h3>
                  <p className="text-lg text-gray-700">
                    {order.currentLocation}
                  </p>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-lg text-gray-700">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get status classes
const getStatusClass = (status) => {
  switch (status) {
    case "Shipped":
      return "bg-blue-500";
    case "Delivered":
      return "bg-green-500";
    case "Pending":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export default ViewOrderPage;
