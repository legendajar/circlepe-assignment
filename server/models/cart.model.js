import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    spaceStation_id: { type: mongoose.Schema.Types.ObjectId, ref:'SpaceStation', required: true },
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
})

const cartModel = mongoose.model('Cart', cartSchema)
export default cartModel