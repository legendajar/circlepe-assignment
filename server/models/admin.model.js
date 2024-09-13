import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    last_login: { type: Date, default: Date.now()},
    last_IP_Address: { type: Number },
    reset_password_token: { type: Number },
    reset_password_expiresAt: { type: Date },
})

const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel