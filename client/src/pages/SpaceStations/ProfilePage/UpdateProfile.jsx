import { Eye, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const UpdateProfile = () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  const handleVisibilityToggle = () => {
    setVisible(!visible);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Display the selected image
    }
  };
  return (
    <div className="p-6">
      <form>
        {/* Profile Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Profile Image
          </label>
          <div className="flex items-center space-x-4">
            {image && (
              <img
                src={image}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              className="file:border-none file:bg-designColor file:text-white file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
              onChange={handleImageChange}
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
