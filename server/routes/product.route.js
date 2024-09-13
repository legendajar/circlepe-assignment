import express from 'express'
import { addProduct, deleteProduct, getProducts, getProductsByID, getProductsByPlanet, updateProduct } from '../controllers/product.controller.js'

const ProductRoute = express.Router()

ProductRoute.post('/add', addProduct)
ProductRoute.get('/get/all', getProducts)
ProductRoute.get('/get/:id', getProductsByID)
ProductRoute.get('/get/planet/:id', getProductsByPlanet)
ProductRoute.put('/update/:id', updateProduct)
ProductRoute.delete('/delete/:id', deleteProduct)

export default ProductRoute