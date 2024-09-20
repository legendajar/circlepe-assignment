import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SPACE_STATION_API_END_POINT } from '@/utils/URLS';
SPACE_STATION_API_END_POINT

const ResetPasswordForm = () => {
  const [ input, setInput ] = useState({
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('');


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
  }

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    const formData = new FormData();
    formData.append('newPassword', input.password)
    formData.append('confirmPassword', input.confirmPassword)

    try {
        const res = await axios.post(`${SPACE_STATION_API_END_POINT}/password/reset`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        if (res.data.success) {
            navigate('/login')
            setError(res.data.message)
        } else {
            setError(res.data.message)
        }
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form onSubmit={submitHandler}>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={input.password}
                onChange={changeInputHandler}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onChange={changeInputHandler}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
