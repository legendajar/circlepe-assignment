import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSection = () => {
  const { user } = useSelector((store) => store.spaceStation);
  const navigate = useNavigate();
  const shopButtonHandler = () => {
    navigate("/");
  }
  return (
    <div>
      {user.orders && user.orders.length > 0 ? (
        user.orders.map((order, index) => (
          <div className="p-6 bg-white shadow-md rounded-md w-full mx-auto mb-6" key={index}>
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order: {order._id}</h2>
                <p className="text-gray-600">Order Date: 25/09/2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Expected Delivery: 24/09/2024
                </p>
                <p className="text-green-600">Delivered</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-500">Product Name</span>
                <span className="text-lg font-medium">ABCD</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500">Order Price</span>
                <span className="text-lg font-medium">$ 500</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500">Current Location</span>
                <span className="text-lg font-medium">Etawah</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500">Delivery Status</span>
                <span className="text-green-600">Delivered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Payment Type</span>
                <span className="text-lg font-medium">COD</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500">Payment Status</span>
                <span className="text-green-600">Payment Done</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <div className="p-6 w-full text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 12l6 6m-6-6l-6 6"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-600 mb-4">
              It looks like you haven't placed any orders yet. Start shopping
              now to place your first order!
            </p>
            <button
              className="bg-designColor text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-200"
              onClick={shopButtonHandler}
            >
              Go to Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSection;
