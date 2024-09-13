import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    payment_id: { type: String, required: true },
    payment_signature: { type: String, required: true },
    payment_status: { type: String, required: true },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
export default transactionModel