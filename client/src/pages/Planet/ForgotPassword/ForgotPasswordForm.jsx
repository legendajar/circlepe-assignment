import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { PLANET_API_END_POINT } from '@/utils/URLS';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.err("Passwords do not match");
    }

    try {
        const res = await axios.post(`${PLANET_API_END_POINT}/reset/password`, {
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })

        if (res.data.success) {
            toast.success(res.data.message);
            navigate('/planet/login')
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        console.log("Err: ", err)
        toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Field */}
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showNewPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm New Password Field */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
