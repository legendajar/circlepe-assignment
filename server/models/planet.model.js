import mongoose from 'mongoose'

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FGoogleIndia%2F&psig=AOvVaw3r101Mako7enr2yfrLWbWJ&ust=1729681842229000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDf75DtoYkDFQAAAAAdAAAAABAE" },
    device_details: [{
        device_os: { type: String },
        device_ipAddress: { type: String },
        device_location: { type: String },
        device_name: { type: String }
    }],
    last_login: [{
        ip: { type: String },
        time: { type: Date, default: Date.now }
    }],
    reset_password: {type: Number},
    reset_password_status: {type: Boolean, default: false},
    reset_password_time: {type: Date},
}, {timestamps: true});

const planetModel = mongoose.model("Planet", planetSchema);

export default planetModel