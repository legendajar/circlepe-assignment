import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product: [{
        product_id: { type: String, required: true },
        quantity: { type: Number, required: true },
        product_price: { type: Number, required: true },
    }],
    order_date: { type: Date, default: Date.now },
    order_status: { type: String, default: "Pending" },
    address: {
        name: { type: String, required: true },
        firstLine: { type: String, required: true },
        secondLine: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
        mobile: { type: String, required: true }  // Changed from Number to String
    },
    user_id: { type: String, required: true },
    total_price: { type: Number, required: true }, // Changed from String to Number
    payment_method: { type: String, required: true },
    transaction_id: { type: String },
    transaction_status: { type: String },
    delivery_location: [{
        city: { type: String, required: true }
    }]
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
