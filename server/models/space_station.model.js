import mongoose from 'mongoose';

const spaceStationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    orders: [{
        order_id: {
            type: String,
            required: true
        }
    }],
    image: { type: String },
    address: [{
        firstLine: {type: String, required: true},
        secondLine: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        pincode: {type: String, required: true}
    }],
    last_login: {type: Date, default: Date.now()},
    last_IP_Address: { type: Number },
    reset_password: { type: Number },
    reset_password_time: { type: Date },
}, {timestamps: true});

const spaceStationModel = mongoose.model("SpaceStation", spaceStationSchema);

export default spaceStationModel;