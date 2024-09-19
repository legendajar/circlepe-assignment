import mongoose from 'mongoose'

const spaceStationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    address: [{
        name: {type: String, required: true},
        mobile: {type: String, required: true},
        firstLine: {type: String, required: true},
        secondLine: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        pincode: {type: String, required: true}
    }],
    device_details: [{
        device_os: { type: String },
        device_ipAddress: { type: String }, // Changed from Number to String
        device_location: { type: String },
        device_name: { type: String }
    }],
    last_login: [{
        ip: { type: String },
        time: { type: Date, default: Date.now }
    }],
    reset_password: { type: Number },
    reset_password_time: { type: Date },
}, { timestamps: true });

const spaceStationModel = mongoose.model("SpaceStation", spaceStationSchema);

export default spaceStationModel;
