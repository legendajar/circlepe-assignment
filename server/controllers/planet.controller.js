import planetModel from "../models/planet.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Add Planet
export const addPlanet = async(req, res) => {
    try {
        const { name, mobile, email, password, confirmPassword } = req.body;

        const requiredFields = { name, mobile, email, password, confirmPassword };
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                });
            }
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const isExists = await planetModel.findOne({email: email});
        if (isExists) {
            return res.status(400).json({
                success: false,
                message: "Planet already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newPlanet = new planetModel({
            name: name,
            mobile: mobile,
            email: email,
            password: hashedPassword
        })

        const savedPlanet = await newPlanet.save();
        return res.status(201).json({
            success: true,
            message: "Planet added successfully",
            data: savedPlanet
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

// login Planet
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
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

        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// Get All Planet
export const getAllPlanet = async(req, res) => {
    try {
        const planets = await planetModel.find();
        if (!planets) {
            return res.status(404).json({
                success: false,
                message: "No planets found"
            })
        }
        return res.status(200).json({
            success: true,
            data: planets
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

// Get Planet By ID
export const getPlanetById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Planet Id Not Found"
            })
        }

        const planet = await planetModel.findById(id);
        if (!planet) {
            return res.status(404).json({
                sucess: false,
                message: "Planet Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            data: planet
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

// Update Planet
export const updatePlanet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, image } = req.body
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Planet Id Not Found"
            })
        }

        const isExists = await planetModel.findById(id);
        if(!isExists) {
            return res.status(404).json({
                success: false,
                message: "Planet Not Found"
            })
        }

        const updatedData = {
            name: name,
            email: email,
            mobile: mobile,
            image: image
        }

        await planetModel.findByIdAndUpdate(id, updatedData, { new: true });
        return res.status(200).json({
            sucess: true,
            message: "Planet Details Updated Successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}

