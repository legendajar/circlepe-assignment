import useGetOrderBySpaceStation from "@/hooks/useGetOrderBySpaceStation";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSection = () => {
  const { user } = useSelector((store) => store.spaceStation);
  useGetOrderBySpaceStation(user._id);
  const orderList = useSelector((store) => store.order.orderListSpaceStation);
  const navigate = useNavigate();
  const shopButtonHandler = () => {
    navigate("/");
  };
  return (
    <div>
      {orderList && orderList.length > 0 ? (
        orderList.map((order, index) => (
          <div
            className="order-item p-6 bg-white shadow-md rounded-md w-full mx-auto mb-6"
            key={index}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                <p className="text-gray-600">
                  Order Date: {new Date(order.order_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold">Shipping Address:</h3>
              <p className="text-gray-700">
                {order.address.name} <br />
                {order.address.firstLine}, {order.address.secondLine},{" "}
                {order.address.city}, <br />
                {order.address.state}, {order.address.country} -{" "}
                {order.address.pincode} <br />
                Mobile: {order.address.mobile}
              </p>
            </div>

            <div className="product-list mt-6">
              <h3 className="text-lg font-semibold">Products:</h3>

              {/* Loop through each product */}
              {order.product.map((product, prodIndex) => (
                <div
                  className="flex items-center p-4 border-b border-gray-200 transition-shadow duration-200 hover:shadow-xl"
                  key={prodIndex}
                >
                  <div className="w-full flex items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 shadow-md transition-transform duration-200 transform hover:scale-105">
                    {/* Product Image (Passport Size) */}
                    <div className="w-1/4 flex justify-center">
                      <img
                        src={product.product_id.image}
                        alt={product.product_id.name}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-blue-300 shadow-lg transition-transform duration-200 transform hover:scale-110"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="ml-6 w-3/4">
                      <p className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        {product.product_id.name}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Quantity:</span>{" "}
                        {product.quantity}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Price:</span> $
                        {product.product_price}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Order Status:</span>{" "}
                        {product.order_status}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">
                          Expected Delivery:
                        </span>{" "}
                        {new Date(
                          product.expected_delivery_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary mt-6">
              <h3 className="text-lg font-semibold">Order Summary:</h3>
              <p className="text-gray-700">Total Price: ${order.total_price}</p>
              <p className="text-gray-700">
                Payment Method: {order.payment_method}
              </p>
              <p className="text-gray-700">
                Transaction ID: {order.transaction_id}
              </p>
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
