import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

// Ensure the model name 'Cart' is consistent across your application
const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
