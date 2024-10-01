import orderModel from "../models/order.model.js";
import stripe from 'stripe'; // Make sure to import and configure Stripe
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productModel from "../models/product.model.js";

dotenv.config()

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

export const addOrder = async (req, res) => {
    const spaceStationId = req.id;
    if (!spaceStationId) {
        return res.status(404).json({
            success: false,
            message: "Invalid Access, Please Login Again"
        });
    }
    const frontendUrl = 'http://localhost:5173';

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
                product_id: new mongoose.Types.ObjectId(item._id),  // Use 'new' here
                quantity: item.quantity,
                product_price: item.price,
                expected_delivery_date: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
                delivery_status: [{
                    city: "Pending",
                }]
            })),
            address: {
                name,
                mobile,
                firstLine,
                secondLine,
                city,
                state,
                country,
                pincode: zip,
            },
            user_id: new mongoose.Types.ObjectId(spaceStationId),  // Use 'new' here as well
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
        const order = await orderModel.find().populate({path: 'product.product_id'
        }).populate({path: 'user_id'});
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
        const id = req.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const order = await orderModel
        .find({user_id: id})
        .populate({ path: 'user_id'})
        .populate({ path: 'product.product_id'})
        .exec();
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

export const getPlanetOrder = async(req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const products = await productModel.find({
            planet_id: id
        }).populate('ratings.userId')
        const orders = await orderModel.aggregate([
            { $unwind: "$product" },
            { $match: { "product.product_id": { $in: products.map(product => product._id)}} },
            {
                $group: {
                    _id: "$product.product_id",
                    totalOrders: { $sum: "$product.quantity" },
                    orderDetails: { $push: "$$ROOT"}
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

