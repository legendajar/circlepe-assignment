import express from 'express'
import { addProduct, deleteProduct, getProducts, getProductsByID, getProductsByPlanet, updateProduct } from '../controllers/product.controller.js'
import productImageUploader from '../middlewares/productImageUploader.js'

const ProductRoute = express.Router()

ProductRoute.post('/add', productImageUploader, addProduct)
ProductRoute.get('/get/all', getProducts)
ProductRoute.get('/get/:id', getProductsByID)
ProductRoute.get('/get/planet/:id', getProductsByPlanet)
ProductRoute.put('/update/:id', updateProduct)
ProductRoute.delete('/delete/:id', deleteProduct)

export default ProductRoute