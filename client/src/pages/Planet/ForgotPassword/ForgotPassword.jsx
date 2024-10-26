import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { PLANET_API_END_POINT } from "@/utils/URLS";
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const loading = useSelector(store => store.loading.loading)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const navigate = useNavigate()

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);    
    try {
        const res = await axios.post(`${PLANET_API_END_POINT}/forgot/password/otp/send`, { email: email }, {
            withCredentials: true
        });

      if(res.data.success) {
        toast.success(res.data.message)
        navigate('/planet/forgot/password/otp', { state: { email: email }})
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address, and we'll send you otp to reset your password.
        </p>
        <div className="relative mb-4">
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <Button
          onClick={handleForgotPassword}
          disabled={!email || loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition"
        >
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
