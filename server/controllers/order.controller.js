import orderModel from "../models/order.model.js";
import stripe from 'stripe'; // Make sure to import and configure Stripe
import dotenv from 'dotenv'

dotenv.config()

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

export const addOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5173";
    
    try {
        // Destructure the request body
        const { 
            productList, 
            name, 
            mobile, 
            firstLine, 
            secondLine, 
            city, 
            state, 
            country, 
            zip, 
            user_id, 
            total_price, 
            payment_method 
        } = req.body;


        // Validate required fields
        const requiredDetails = { 
            productList, 
            name, 
            mobile, 
            firstLine, 
            secondLine, 
            city, 
            state, 
            country, 
            zip, 
            user_id, 
            total_price, 
            payment_method 
        };
        
        for (const [field, value] of Object.entries(requiredDetails)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                });
            }
        }

        // Create the order
        const newOrder = await orderModel.create({
            product: productList.map(item => ({
                product_id: item._id,
                quantity: item.quantity,
                product_price: item.price
            })),
            address: {
                name,
                firstLine,
                secondLine,
                city,
                state,
                country,
                pincode: zip,
                mobile
            },
            user_id,
            total_price,
            payment_method
        });

        // Create Stripe Checkout session
        const lineItems = productList.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 50 * 100
            },
            quantity: 1
        });

        const session = await stripeClient.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });


        // Update the order with Stripe session ID and status
        await orderModel.findByIdAndUpdate(newOrder._id, {
            transaction_id: session.id,
            transaction_status: "Pending"
        });

        // Provide the Stripe session URL to the frontend
        return res.status(200).json({
            success: true,
            session_url: session.url
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;
    try {
        if (success === "true") {
            // Update the order's payment status and transaction status
            const result = await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                transaction_status: "Success"
            }, { new: true });

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found."
                });
            }

            return res.json({
                success: true,
                message: "Payment successful, order updated."
            });
        } else {
            // Remove the order if payment failed
            const result = await orderModel.findByIdAndDelete(orderId);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found."
                });
            }

            return res.json({
                success: false,
                message: "Payment failed, order removed."
            });
        }
    } catch (err) {
        console.error("Error verifying order:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error while verifying order."
        });
    }
}

export const getOrder = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getOrderByUserId = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const order = await orderModel.find({user_id: id});
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

