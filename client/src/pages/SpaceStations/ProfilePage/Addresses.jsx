import React from "react";

const Addresses = () => {
  const addresses = [
    {
      name: "John Doe",
      mobile: "123-456-7890",
      firstLine: "123 Elm Street",
      secondLine: "Apt 4B",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      pincode: "90001",
    },
    {
      name: "Jane Smith",
      mobile: "987-654-3210",
      firstLine: "456 Oak Avenue",
      secondLine: "",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      pincode: "94103",
    },
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
      {addresses.map((address, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-2">Address {index + 1}</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">{address.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Mobile:</span>
              <span className="text-gray-800">{address.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-gray-800">
                {address.firstLine}
                <br />
                {address.secondLine && (
                  <>
                    {address.secondLine}
                    <br />
                  </>
                )}
                {address.city}, {address.state} {address.pincode}
                <br />
                {address.country}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Addresses;
