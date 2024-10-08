import orderModel from "../models/order.model.js";
import stripe from 'stripe'; // Make sure to import and configure Stripe
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productModel from "../models/product.model.js";
import spaceStationModel from "../models/space_station.model.js";

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
                product_id: new mongoose.Types.ObjectId(item._id),  // Using 'new' here for ObjectId
                quantity: item.quantity,
                product_price: item.price,
                expected_delivery_date: Date.now() + 7 * 24 * 60 * 60 * 1000,  // 7 days delivery
                order_status: "Pending",
                delivery_location: [{
                    city: "Pending"
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
            user_id: new mongoose.Types.ObjectId(spaceStationId),  // Using 'new' for user ObjectId
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

        // Add delivery charges
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

export const getPlanetOrder = async (req, res) => {
    try {
        const planetId = req.params.id;
        if (!planetId) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            });
        }

        // Fetch the products belonging to the planet
        const products = await productModel.find({ planet_id: planetId }).populate('ratings.userId');

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for this planet"
            });
        }

        // Find orders where product.product_id matches the planet's products
        const orders = await orderModel.aggregate([
            { $unwind: "$product" },
            { $match: { "product.product_id": { $in: products.map(product => product._id) } } },
            // Lookup product details to access the price
            {
                $lookup: {
                    from: "products",
                    localField: "product.product_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" }, // Unwind product details to access individual prices
            {
                $group: {
                    _id: "$_id",
                    totalQuantity: { $sum: "$product.quantity" }, // Calculate total quantity
                    totalPrice: { // Calculate total price of the order
                        $sum: {
                            $multiply: ["$product.quantity", "$productDetails.price"] // Use price from productDetails
                        }
                    },
                    orderDetails: { $push: "$$ROOT" }, // Keep the full order details
                    productDetails: { $push: "$productDetails" }, // Keep the product details in the response
                    address: { $first: "$address" } // Keep the address of the order
                }
            },
            // Lookup user details
            {
                $lookup: {
                    from: "spacestations",  // Collection for the user data
                    localField: "orderDetails.user_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Unwind to access user details
            },
            {
                $project: {
                    totalQuantity: 1,
                    totalPrice: 1,
                    productDetails: 1, // Include product details
                    address: 1, // Include address
                    "userDetails._id": 1,
                    "userDetails.name": 1,
                    "userDetails.email": 1,
                    "userDetails.mobile": 1
                }
            }
        ]);

        // If no orders are found
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for products listed by this planet"
            });
        }

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (err) {
        console.error('Error fetching planet orders:', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const getPlanetSingleOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        // Validate the order ID
        if (!orderId) {
            return res.status(404).json({
                success: false,
                message: "Invalid Order ID"
            });
        }

        // Fetch the order by ID and populate user and product details
        const order = await orderModel.findById(orderId)
            .populate({ path: 'user_id' })
            .populate({ path: 'product.product_id' });

        // Check if order exists
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        // Return the order details
        return res.status(200).json({
            success: true,
            data: order // Directly return the order object
        });
    } catch (err) {
        console.error('Error fetching single planet order:', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
      const orderId = req.params.id;
      const { productId, orderStatus, location } = req.body;
  
      // Check required parameters
      if (!orderId || !productId || !orderStatus) {
        return res.status(400).json({
          success: false,
          message: "Order ID, product ID, and status are required"
        });
      }
  
      // Find the order by ID and populate necessary fields
      const order = await orderModel.findById(orderId)
        .populate({ path: 'user_id' })
        .populate({ path: 'product.product_id' });
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order Not Found"
        });
      }
  
      // Update the order status for the specified product
      let productFound = false;
      for (let prod = 0; prod < order.product.length; prod++) {
        if (order.product[prod].product_id._id.toString() === productId) {
          // Update order status
          order.product[prod].order_status = orderStatus;
  
          // Handle the location update based on the location parameter
          if (location) {
            // Ensure delivery_location exists and is an array
            if (!Array.isArray(order.product[prod].delivery_location)) {
              order.product[prod].delivery_location = [];
            }
  
            if (location === 'Accepted' || location === 'Cancelled') {
              // If it's a known status, update the first entry's city
              order.product[prod].delivery_location[0] = { city: location };  
            } else {
              // Otherwise, append a new location entry
              order.product[prod].delivery_location.push({ city: location });
            }
          }
  
          productFound = true;
          break;
        }
      }
  
      // If product is not found, return an error
      if (!productFound) {
        return res.status(404).json({
          success: false,
          message: "Product Not Found in Order"
        });
      }
  
      // Save the updated order
      await order.save();
  
      // Return success response
      return res.status(200).json({
        success: true,
        message: `${orderStatus} Successfully`,
        data: order
      });
    } catch (err) {
      console.error("Error updating order status: ", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };
  

