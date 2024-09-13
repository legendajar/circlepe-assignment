import mongoose from 'mongoose'

const deliveryWarehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    orders: [{ order_id: { type: String, required: true }}],
    address: { type: String, required: true },
})

const deliveryWarehouseModel = mongoose.model('DeliveryWarehouse', deliveryWarehouseSchema);

export default deliveryWarehouseModel