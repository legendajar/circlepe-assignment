import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS.js";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // Local loading state

  const visibleHandler = () => setVisible(!visible);
  const confirmPasswordHandler = () => setConfirmVisible(!confirmVisible);

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const sendOTP = async (email) => {
    try {
      const res = await axios.post(`${SPACE_STATION_API_END_POINT}/account/verification/send/otp`, { email: email}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post(
        `${SPACE_STATION_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/otp/verify", { state: {email: input.email}});
        sendOTP(input.email)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while sending the OTP.");
    } finally {
      setLoading(false); // Set loading to false after form submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white py-12 px-10 shadow-lg rounded-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Register
        </h2>
        <form onSubmit={submitHandler} className="space-y-6 w-full">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
                value={input.name}
                onChange={changeInputHandler}
                disabled={loading} // Disable input while loading
                required
              />
            </div>
            <div>
              <Label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile
              </Label>
              <Input
                type="text"
                id="mobile"
                name="mobile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mobile"
                value={input.mobile}
                onChange={changeInputHandler}
                disabled={loading} // Disable input while loading
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
              value={input.email}
              onChange={changeInputHandler}
              disabled={loading} // Disable input while loading
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                type={visible ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={input.password}
                onChange={changeInputHandler}
                disabled={loading} // Disable input while loading
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={visibleHandler}
              >
                {visible ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                type={confirmVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onChange={changeInputHandler}
                disabled={loading} // Disable input while loading
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={confirmPasswordHandler}
              >
                {confirmVisible ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-4 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Register"
            )}
          </Button>
          <div className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
