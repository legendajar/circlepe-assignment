import mongoose from "mongoose";

const deliveryAgentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    orders: [{ order_id: {type: String, required: true} }],
    reset_password_token: {type: Number},
    reset_password_expiresAt: { type: Date },
    last_login: { type: Date },
    last_IP_Address: { type: Number },
})

const deliveryAgentModel = mongoose.model("Delivery Agent", deliveryAgentSchema)
export default deliveryAgentModel