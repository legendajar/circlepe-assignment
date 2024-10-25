import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SPACE_STATION_API_END_POINT } from '@/utils/URLS';

const ResetPasswordOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputRefs = useRef([]);
  const timerRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.includes('')) {
      return toast.error("Please enter the complete OTP.");
    }
    const otpNumber = Number(otp.join(''));
    try {
      const res = await axios.post(
        `${SPACE_STATION_API_END_POINT}/account/password/reset/verify`, 
        { otp: otpNumber },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/reset-password');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'An error occurred while verifying the OTP.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${SPACE_STATION_API_END_POINT}/account/password/reset/send/otp`, {}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeRemaining(600); // Restart the timer
        setIsResendEnabled(false); // Disable the resend button
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'An error occurred while resending the OTP.');
    }
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setIsResendEnabled(true);
      toast.error("OTP expired. Please request a new one.");
    }
    return () => clearInterval(timerRef.current);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white py-8 px-6 shadow-lg rounded-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Reset Password - OTP Verification
        </h2>
        <p className="text-center text-gray-500">Time remaining: {formatTime(timeRemaining)}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={timeRemaining === 0}
          >
            Submit OTP
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            className="w-full mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            disabled={!isResendEnabled}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordOTP;
