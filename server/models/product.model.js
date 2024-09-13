import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    planet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ratings: [{
        userId: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true }
    }]
})

const productModel = mongoose.model('Product', productSchema)

export default productModel