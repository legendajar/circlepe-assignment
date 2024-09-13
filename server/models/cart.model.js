import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
})

const cartModel = mongoose.model('Cart', cartSchema)
export default cartModel