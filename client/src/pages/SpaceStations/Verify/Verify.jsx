import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Verify.css'; // Ensure this file is updated with the new styles
import { ORDER_API_END_POINT } from '@/utils/URLS.js';


const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    // Function to verify payment
    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${ORDER_API_END_POINT}/verify`, { success, orderId });
            if (response.data.success) {
                // Navigate to orders page or any success page
                navigate("/myorders");
            } else {
                // Navigate to error page or home page
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="verification-content">
                {success === "true" ? (
                    <div className="success-message">
                        <h1>Payment Successful!</h1>
                        <p>Your order has been placed successfully. Redirecting to your orders...</p>
                    </div>
                ) : (
                    <div className="error-message">
                        <h1>Payment Failed</h1>
                        <p>There was an issue with your payment. Please try again.</p>
                    </div>
                )}
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default Verify;
