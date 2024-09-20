import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import { useNavigate } from "react-router-dom";

const OtpPopUp = ({ show, closePopup }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const closeButton = () => {
    closePopup(false); // Correctly use the show function to close the popup
  };

  useEffect(() => {
    if (show) {
      setOtp("");
      setTimer(30);
      setIsResendDisabled(true);
    }
  }, [show]);

  useEffect(() => {
    let countdown;
    if (show && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer, show]);

  const handleOtpChange = (e) => setOtp(e.target.value);
  const navigate = useNavigate();
  const handleResend = async (e) => {
    setTimer(30);
    setIsResendDisabled(true);
    console.log("Resend OTP");

    e.preventDefault();
    // Optionally, add resend OTP logic here
    try {
        const res = await axios.post(`${SPACE_STATION_API_END_POINT}/reset/password/otp/resend`, {withCredentials: true})
        if (res.data.success) {
            alert(res.data.message)
        } else {
            alert(res.data.message)
        }
    } catch (err) {
        console.log(err)
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      // Call the OTP verification API endpoint
      const res = await axios.post(
        `${SPACE_STATION_API_END_POINT}/reset/password/verification`,
        { otp: otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate('/spacestation/reset/password/form')
        alert(res.data.message);
        closeButton(); // Close the popup after successful verification
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={closeButton}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Please enter the OTP sent to your email. The OTP is valid for 30
          seconds.
        </p>
        <Input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter OTP"
        />
        <div className="flex items-center justify-between mb-4">
          <button
            className={`text-sm text-indigo-600 hover:underline ${
              isResendDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleResend}
            disabled={isResendDisabled}
          >
            Resend OTP
          </button>
          <span className="text-sm text-gray-500">
            {isResendDisabled ? `Resend in ${timer}s` : "You can resend now"}
          </span>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={handleOtpSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
          <Button
            onClick={closeButton}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpPopUp;
