import adminModel from "../models/admin.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body
        const requiredFields = { name, email, mobile, password };
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                })
            }
        }

        const isExists = await adminModel.findOne({ email: email })
        if (isExists) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            })
        }

        const newAdmin = new adminModel({
            name: name,
            email: email,
            mobile: mobile,
            password: password
        })

        const savedAdmin = await newAdmin.save();
        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: savedAdmin
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(404).json({
                success: false,
                message: "Email Not Found"
            })
        }
        if (!password) {
            return res.status(404).json({
                success: false,
                message: "Password Not Found"
            })
        }

        const admin = await adminModel.findOne({ email: email })
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {expiresIn: "1d"})
        return res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            token: token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}