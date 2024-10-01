import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS.js";
import { setUser } from "@/redux/spaceStationSlice";
import platform from "platform";
import getLocationByIp from "@/utils/locationDetection.js";
import getIpAddress from "@/utils/getIPAddress.js";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const visibleHandler = () => {
    setVisible(!visible);
  };

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const os = `${platform.os.family} ${platform.os.version}`;
    const deviceName = platform.product;

    try {
      const ip = await getIpAddress();

      // Get location by IP
      const locationRes = await getLocationByIp(ip);
      const location = `${locationRes.data.city}, ${locationRes.data.region}, ${locationRes.data.country}`;

      const formData = new FormData();
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("os", os);
      formData.append("deviceName", deviceName);
      formData.append("ip", ip);
      formData.append("location", location);

      const res = await axios.post(
        `${SPACE_STATION_API_END_POINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white py-8 px-6 shadow-lg rounded-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={visibleHandler}
              >
                {visible ? (
                  <Eye className="text-gray-500" />
                ) : (
                  <EyeOff className="text-gray-500" />
                )}
              </span>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Don't have an account? Register here
            </Link>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <Link
              to="/spacestation/reset/password"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Forgot password? Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
