// components/UpdateProfile.js
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/spaceStationSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.spaceStation.user);
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    file: null
  });

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
        // Dispatch action to update user in Redux store
        dispatch(setUser(res.data.user));
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
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
              name='file'
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
            name='name'
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
            name='email'
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
            name='mobile'
            onChange={changeInputHandler}
            value={input.mobile}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-designColor text-black py-2 rounded-md hover:bg-opacity-90 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
