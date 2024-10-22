import { setLoading } from "@/redux/loadingSlice";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangePasswordSection = () => {
  const {loading} = useSelector((store) => store.loading);
  const dispatch = useDispatch();
  dispatch(setLoading(false))
  const id = useSelector((store) => store.spaceStation.user._id);
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the specific field
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true)); // Set loading to true when request starts

    try {
      const formData = new FormData();
      formData.append("oldPassword", input.oldPassword);
      formData.append("newPassword", input.newPassword);
      formData.append("confirmNewPassword", input.confirmNewPassword);

      const res = await axios.post(
        `${SPACE_STATION_API_END_POINT}/change/password/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setInput({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false)); // Set loading to false when request completes
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={submitHandler}>
        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
            Old Password
          </label>
          <div className="flex items-center justify-between">
            <input
              type={passwordVisibility.oldPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={input.oldPassword}
              onChange={changeInputHandler}
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
              name="newPassword"
              value={input.newPassword}
              onChange={changeInputHandler}
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
              type={
                passwordVisibility.confirmNewPassword ? "text" : "password"
              }
              id="confirmPassword"
              name="confirmNewPassword"
              value={input.confirmNewPassword}
              onChange={changeInputHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-designColor"
              placeholder="Confirm your new password"
              required
            />
            {passwordVisibility.confirmNewPassword ? (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("confirmNewPassword")}
              >
                <Eye />
              </span>
            ) : (
              <span
                className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => togglePasswordVisibility("confirmNewPassword")}
              >
                <EyeOff />
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-designColor text-black py-2 rounded-md hover:bg-opacity-90 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordSection;
