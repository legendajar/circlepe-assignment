import cartModel from "../models/cart.model.js";

export const addCart = async (req, res) => {
    try {
        const { productId } = req.body

        const requiredDetails = { productId }
        for (const [field, value] of Object.entries(requiredDetails)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                });
            }
        }

        const newCart = new cartModel({
            productId: productId
        })

        const savedCart = await newCart.save();
        return res.status(201).json({
            success: true,
            message: "Cart added successfully",
            data: savedCart
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllCart = async (req, res) => {
    try {
        const carts = await cartModel.find().populate({
            path: 'products',
        });

        console.log('Carts:', carts); // Debugging log

        return res.status(200).json({
            success: true,
            data: carts
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


export const viewCart = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const cart = await cartModel.findOne({ spaceStation_id: id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            data: cart
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const cart = await cartModel.findOne({ spaceStation_id: id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        const updatedData = {
            productList: productList,
            price: price
        }

        const updatedCart = await cartModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: "Something not good"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: updatedCart
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const cart = await cartModel.findOne({ spaceStation_id: id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }
        const deletedCart = await cartModel.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: "Something not good"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart deleted successfully",
            data: deletedCart
        })
    } catch (err) {
        console.log(err);
    }
}