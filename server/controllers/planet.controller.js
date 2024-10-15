import planetModel from "../models/planet.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import productModel from "../models/product.model.js";
import spaceStationModel from "../models/space_station.model.js";

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
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

// Login Planet
export const login = async (req, res) => {
    try {
        const { email, password, os, deviceName, ip, location } = req.body;

        // Check for required fields
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        // Find the planet
        const planet = await planetModel.findOne({ email });
        if (!planet) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, planet.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const newLogin = {
            ip: String(ip),
        }
        planet.last_login.push(newLogin)
        const deviceExists = planet.device_details.some(
            (device) => device.device_ipAddress === ip
        );
        if (!deviceExists) {
            console.log("New Device Detected")
            console.log(`
                OS: ${os},
                Device Name: ${deviceName},
                IP Address: ${ip},
                Location: ${location}    
            `)
            const newDeviceDetails = {
                device_os: os,
                device_name: deviceName,
                device_ipAddress: ip,
                device_location: location
            }
            planet.device_details.push(newDeviceDetails)
        }

        await planet.save()

        // Generate JWT token
        const tokenData = {
            planetId: planet._id
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' });

        const newPlanet = await planetModel.findOne({ email: email })
        const user = {
            _id: newPlanet._id,
            name: newPlanet.name,
            email: newPlanet.email,
            mobile: newPlanet.mobile,
            image: newPlanet.image,
            device_details: newPlanet.device_details,
            last_login: newPlanet.last_login
        }

        // Send response with token in cookie
        return res.status(200).cookie("planetToken", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production" || true
        }).json({
            success: true,
            message: "Login Successfully",
            user: user,
            token: token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Logout Planet
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("planetToken", "" , {
            maxAge: 0,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production" || true
        }).json({
            success: true,
            message: "Logout Successfully"
        })
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
            data: {
                _id: planet._id,
                name: planet.name,
                mobile: planet.mobile,
                email: planet.email,
                createdAt: planet.createdAt
            }
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

// Delete Planet
export const deletePlanet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).json({
                success: false,
                message: "Invalid Planet Id"
            })
        }
        const planet = await planetModel.findById(id)
        if (!planet) {
            return res.status(404).json({
                success: false,
                message: "Planet not found"
            })
        }

        await planetModel.findByIdAndDelete(id)
        return res.status(200).josn({
            success: true,
            message: "Planet Deleted Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
