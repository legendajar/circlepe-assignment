import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/spaceStationSlice";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    file: null
  });

  const [loading, setLoading] = useState(false); // Loading state

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const fileInputHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0]
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("mobile", input.mobile);
    formData.append("file", input.file);

    try {
      const res = await axios.put(`${SPACE_STATION_API_END_POINT}/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Dispatch action to update user in Redux store
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={submitHandler}>
        {/* Profile Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Profile Image
          </label>
          <div className="flex items-center space-x-4">
            {input.file && (
              <img
                src={URL.createObjectURL(input.file)}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              name="file"
              className="file:border-none file:bg-designColor file:text-white file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
              onChange={fileInputHandler}
            />
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={changeInputHandler}
            value={input.name}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={changeInputHandler}
            value={input.email}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 mb-2">
            Mobile
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            onChange={changeInputHandler}
            value={input.mobile}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Loading Spinner or Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-black ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-designColor hover:bg-opacity-90 transition duration-200"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {/* Optionally show loading spinner */}
        {loading && (
          <div className="flex justify-center mt-4">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0a12 12 0 00-12 12h4z"
              ></path>
            </svg>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;
