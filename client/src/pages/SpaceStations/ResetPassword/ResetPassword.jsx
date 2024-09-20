import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS";
import OtpPopUp from "@/components/SpaceStations/OtpPopUp/OtpPopUp";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {
            email, // Send the email as an object
        };

        try {
            const res = await axios.post(`${SPACE_STATION_API_END_POINT}/reset/password`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                alert(res.data.message);
                setShowOtpPopup(true); // Show OTP popup
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred. Please try again.");
        }
    };

    const handleCloseOtpPopup = (value) => {
        setShowOtpPopup(value);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white py-12 px-10 shadow-lg rounded-lg max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Forgot Password
                </h2>
                <form onSubmit={submitHandler} className="space-y-6 w-full">
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
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={emailChangeHandler}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-4 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Send OTP
                    </Button>

                    <div className="text-sm text-center text-gray-500 mt-4">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
            <OtpPopUp show={showOtpPopup} closePopup={handleCloseOtpPopup} />
        </div>
    );
};

export default ResetPassword;
