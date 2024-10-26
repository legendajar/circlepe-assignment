import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import axios from 'axios';
import { PLANET_API_END_POINT } from '@/utils/URLS';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPasswordOTP = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  // Countdown timer for 10 minutes
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleOtpChange = (e) => setOtp(e.target.value);

  // Resend OTP handler
  const handleResendOTP = async () => {
    setTimer(600); // Reset timer to 10 minutes
    setIsResendDisabled(true);
    try {
      const res = await axios.post(`${PLANET_API_END_POINT}/forgot/password/resend-otp`, { email });
      if (res.data.success) {
        toast.success('OTP has been resent successfully');
      } else {
        toast.error(res.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Error resending OTP. Please try again.');
      setIsResendDisabled(false);
    }
  };

  // OTP verification handler
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${PLANET_API_END_POINT}/forgot/password/otp/verification`,
        { email, otp },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/planet/forgot/password/form', { state: { email: email }});
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP. Please try again.');
    }
  };

  // Format time remaining for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">OTP Verification</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          We sent an OTP to your email <span className="font-medium">{email}</span>. Enter it below to continue.
        </p>
        <div className="relative mb-4">
          <Input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleResendOTP}
            className={`text-sm font-medium text-indigo-600 hover:underline transition ${
              isResendDisabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isResendDisabled}
          >
            Resend OTP
          </button>
          <span className="text-sm text-gray-500">
            {isResendDisabled ? `Resend in ${formatTime(timer)}` : "You can resend now"}
          </span>
        </div>

        <Button
          onClick={handleVerifyOTP}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition"
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;
