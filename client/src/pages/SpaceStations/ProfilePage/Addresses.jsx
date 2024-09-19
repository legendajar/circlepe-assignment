import AddAddress from "@/components/AddAddress/AddAddress";
import useGetSpaceStationById from "@/hooks/useGetSpaceStationById";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Addresses = () => {
  const params = useParams();
  const id = params.id;
  
  // State to control data refresh
  const [refreshData, setRefreshData] = useState(false);

  // Trigger data fetch on component mount and when refreshData changes
  useGetSpaceStationById(id, refreshData);

  const addresses = useSelector((store) => store.spaceStation.user.address);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // Function to handle showing the AddAddress form
  const handleAddAddressClick = () => {
    setShowAddAddressForm(true);
  };

  // Function to handle closing the AddAddress form
  const closeAddAddressForm = () => {
    setShowAddAddressForm(false);
  };

  // Callback function to refresh data after adding an address
  const handleAddressAdded = () => {
    setShowAddAddressForm(false);
    setRefreshData((prev) => !prev); // Toggle refreshData to trigger data refresh
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Add Address Button */}
      <button
        className="flex items-center justify-center bg-white shadow-md rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-gray-100"
        onClick={handleAddAddressClick}
      >
        <div className="text-lg font-semibold text-blue-500">+ Add Address</div>
      </button>

      {/* Address List */}
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
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
        ))
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 text-center">
          <h3 className="text-lg font-semibold mb-4">No Addresses Found</h3>
          <p className="text-gray-600 mb-4">
            You currently don't have any saved addresses.
          </p>
        </div>
      )}

      {/* Add Address Form Modal */}
      {showAddAddressForm && <AddAddress closeForm={closeAddAddressForm} onAddressAdded={handleAddressAdded} />}
    </div>
  );
};

export default Addresses;
