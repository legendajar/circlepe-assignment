import mongoose from 'mongoose'

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    last_login: { type: Date, default: Date.now()},
    last_IP_Address: { type: Number },
    reset_password: {type: Number},
    reset_password_time: {type: Date},
}, {timestamps: true});

const planetModel = mongoose.model("Planet", planetSchema);

export default planetModel