import AddAddress from "@/components/AddAddress/AddAddress";
import useGetSpaceStationById from "@/hooks/useGetSpaceStationById";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import { toast } from "sonner";

const Addresses = () => {
  const { id } = useParams();
  const [isDataRefreshed, setIsDataRefreshed] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // Fetch space station data
  useGetSpaceStationById(id, isDataRefreshed);

  // Access addresses from Redux store
  const addresses = useSelector((store) => store.spaceStation.singleSpaceStation?.address || []);

  // Handlers for toggling the form and refreshing data
  const handleAddAddressClick = () => setShowAddAddressForm(true);
  const closeAddAddressForm = () => setShowAddAddressForm(false);
  const handleAddressAdded = () => {
    setShowAddAddressForm(false);
    setIsDataRefreshed((prev) => !prev);
  };

  const handleDeleteAddress = async (addressIndex) => {
    try {
      const res = await axios.delete(`${SPACE_STATION_API_END_POINT}/deleteAddress/${id}`, {
        data: { index: addressIndex },
        withCredentials: true,
      });

      if (res.data.success) {
        setIsDataRefreshed((prev) => !prev);
        toast.success("Address Deleted Successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Add Address Button */}
      <button
        className="flex items-center justify-center bg-blue-500 text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition-all duration-150 ease-in-out"
        onClick={handleAddAddressClick}
      >
        + Add New Address
      </button>

      {/* Conditional rendering of addresses */}
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div
            key={index}
            className="relative bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-150 ease-in-out"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Address {index + 1}</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{address.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Mobile:</span>
                <span>{address.mobile}</span>
              </div>
              <div>
                <span className="font-medium">Address:</span>
                <p className="text-sm">
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
                </p>
              </div>
            </div>
            {/* Delete Address Button */}
            <button
              className="absolute top-3 right-3 bg-red-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-150 ease-in-out"
              onClick={() => handleDeleteAddress(index)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Addresses Found</h3>
          <p className="text-gray-600">
            You currently don't have any saved addresses.
          </p>
        </div>
      )}

      {/* Add Address Form Modal */}
      {showAddAddressForm && (
        <AddAddress closeForm={closeAddAddressForm} onAddressAdded={handleAddressAdded} />
      )}
    </div>
  );
};

export default Addresses;
