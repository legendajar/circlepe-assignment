import spaceStationModel from "../models/space_station.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register or Add Space Station
export const register = async (req, res) => {
    try {
        const {name, email, mobile, password, confirmPassword} = req.body;
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
            return res.status(300).json({
                success: false,
                message: "Passwords and Confirm Password Doesn't Match"
            })
        }

        const isExists = await spaceStationModel.findOne({email: email})
        if (isExists) {
            return res.status(103).json({
                success: false,
                message: "Space Station Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await spaceStationModel.create({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: "Space Station created Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// Login Space Station
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
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

        // Find user by email
        let spaceStation = await spaceStationModel.findOne({ email });
        if (!spaceStation) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, spaceStation.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: spaceStation._id
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' });

        // User info to send in response
        const user = {
            _id: spaceStation._id,
            email: spaceStation.email,
            mobile: spaceStation.mobile
        };

        // Send response with token in cookie
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            secure: process.env.NODE_ENV === 'production'
        }).json({
            success: true,
            message: "Space Station Login Successfully",
            user,
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict'
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

// Get All Space Station
export const getAllSpaceStation = async (req, res) => {
    try {
        const spaceStations = await spaceStationModel.find()
        if(!spaceStations || spaceStations.length < 0) {
            return res.status(404).json({
                success: false,
                message: "No Space Stations Found"
            })
        }
        return res.status(200).json({
            success: false,
            data: spaceStations
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// Get Space Station By Id
export const getSpaceStationById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid ID"
            })
        }

        const spaceStation = await spaceStationModel.findById(id)
        if (!spaceStation) {
            return res.status(404).json({
                success: false,
                message: "Space Station Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: spaceStation
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// Update Space Station
export const updateSpaceStation = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, image, address, addressAction, addressIndex, newAddress } = req.body;

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Invalid ID"
        });
    }

    // Find the space station by ID
    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
        return res.status(404).json({
            success: false,
            message: "Space Station Not Found"
        });
    }

    // Handle address-related operations based on addressAction
    if (addressAction) {
        // Adding a new address
        if (addressAction === 'add' && newAddress) {
            spaceStation.address.push(newAddress);
        }

        // Updating an existing address by index
        else if (addressAction === 'update' && addressIndex >= 0 && newAddress) {
            if (spaceStation.address[addressIndex]) {
                spaceStation.address[addressIndex] = newAddress;
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Address not found at the specified index"
                });
            }
        }

        // Deleting an address by index
        else if (addressAction === 'delete' && addressIndex >= 0) {
            if (spaceStation.address[addressIndex]) {
                spaceStation.address.splice(addressIndex, 1);  // Remove the address at the specified index
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Address not found at the specified index"
                });
            }
        }
    }

    // Updating other fields (name, email, mobile, etc.)
    const updatedData = {
        name: name || spaceStation.name,
        email: email || spaceStation.email,
        mobile: mobile || spaceStation.mobile,
        image: image || spaceStation.image,
        address: spaceStation.address  // Use the updated address array
    };

    // Save the updated space station
    const updatedSpaceStation = await spaceStationModel.findByIdAndUpdate(id, updatedData, { new: true });
    
    return res.status(200).json({
        success: true,
        message: "Space Station Updated Successfully",
        data: updatedSpaceStation
    });
};

// Delete Space Station
export const deleteSpaceStation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid ID"
            });
        }
        
        const spaceStation = await spaceStationModel.findById(id);
        if (!spaceStation) {
            return res.status(404).json({
                success: false,
                message: "Space Station Not Found"
            });
        }
        
        await spaceStationModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Space Station Deleted Successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}