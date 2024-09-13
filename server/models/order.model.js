import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product: [{
        product_id: {type: String, required: true},
        quantity: {type: Number, required: true},
        order_price: {type: Number, required: true},
    }],
    order_date: { type: Date, default: Date.now},
    order_status: { type: String, default: "Pending"},
    address: {
        firstLine: {type: String, required: true},
        secondLine: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        pincode: {type: String, required: true}
    },
    user_id: {type: String, required: true},
    total_price: {type: String, required: true},
    payment_method: {type: String, required: true},
    transaction_id: { type: mongoose.Schema.TypesObjectId, ref: 'Transaction' },
    delivery_location: [{
        city: { type: String, required: true }
    }]
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel