import { Eye, EyeOff, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const ChangePasswordSection = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the specific field
    }));
  };
  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form>
        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
            Old Password
          </label>
          <div className="flex items-center justify-between">
            <input
              type={passwordVisibility.oldPassword ? "text" : "password"}
              id="oldPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
              placeholder="Enter your old password"
              required
            />
            {passwordVisibility.oldPassword ? (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("oldPassword")}
              >
                <Eye />
              </span>
            ) : (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("oldPassword")}
              >
                <EyeOff />
              </span>
            )}
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 mb-2">
            New Password
          </label>
          <div className="flex items-center justify-between">
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              id="newPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
              placeholder="Enter your new password"
              required
            />
            {passwordVisibility.newPassword ? (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                <Eye />
              </span>
            ) : (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                <EyeOff />
              </span>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="flex items-center justify-between">
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
              placeholder="Confirm your new password"
              required
            />
            {passwordVisibility.confirmPassword ? (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                <Eye />
              </span>
            ) : (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                <EyeOff />
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-designColor text-black py-2 rounded-md hover:bg-opacity-90 transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordSection;
