import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    products: [{ product_id: { type: String, required: true } }],
    address: { type: String, required: true },
    changePassword: { type: String, }
})