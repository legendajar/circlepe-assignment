import { setLoading } from "@/redux/loadingSlice";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddAddress = ({ closeForm, onAddressAdded }) => {
  const { id } = useSelector((store) => store.spaceStation.user);
  const { loading } = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  const [addAddress, setAddAddress] = useState({
    name: "",
    mobile: "",
    firstLine: "",
    secondLine: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  // Reference to the form container
  const formRef = useRef();

  const changeInputHandler = (e) => {
    setAddAddress({
      ...addAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true)); // Set loading to true

    try {
      const res = await axios.post(
        `${SPACE_STATION_API_END_POINT}/add/address/${id}`,
        addAddress,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Inside your try block, this part is already correct:
      if (res.data.success) {
        alert(res.data.message);
        onAddressAdded(addAddress); // Notify the parent component (Addresses) about the new address
        // Reset form fields after success
        setAddAddress({
          name: "",
          mobile: "",
          firstLine: "",
          secondLine: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false)); // Set loading back to false
    }
  };

  // Effect to handle clicks outside the form container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeForm]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={formRef} // Reference to the form container
        className="bg-white rounded-lg shadow-lg p-6 w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Address</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={addAddress.name}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={addAddress.mobile}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="firstLine"
            placeholder="Address Line 1"
            value={addAddress.firstLine}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="secondLine"
            placeholder="Address Line 2"
            value={addAddress.secondLine}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={addAddress.city}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={addAddress.state}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={addAddress.country}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={addAddress.pincode}
            onChange={changeInputHandler}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={closeForm} // Close form on cancel
          >
            Cancel
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleFormSubmit}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
