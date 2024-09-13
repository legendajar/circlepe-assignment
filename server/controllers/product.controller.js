import productModel from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, quantity, image, description, category } = req.body
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        await productModel.create({
            planet_id: id,
            name: name,
            price: price,
            quantity: quantity,
            image: image,
            description: description,
            category: category
        }) 

        return res.status(200).json({
            success: true,
            message: "Product Added Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch (err) {
        console.log(err)
    }
}

export const getProductsByID = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            data: product
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getProductsByPlanet = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }
        const products = await productModel.find({ planet_id: id })
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Products Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, quantity, image, description, category } = req.body
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const updatedData = {
            name: name,
            price: price,
            quantity: quantity,
            image: image,
            description: description,
            category: category
        }
        await productModel.findByIdAndUpdate(id, updatedData, {new: true})
        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }
        
        const isExists = await productModel.findById(id)
        if(!isExists) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        
        await productModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}