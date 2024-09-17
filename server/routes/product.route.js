import express from 'express'
import { addProduct, addRating, deleteProduct, getProducts, getProductsByID, getProductsByPlanet, updateProduct } from '../controllers/product.controller.js'
import productImageUploader from '../middlewares/productImageUploader.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const ProductRoute = express.Router()

ProductRoute.post('/add', isAuthenticated, productImageUploader, addProduct)
ProductRoute.get('/get/all', getProducts)
ProductRoute.get('/get/:id', getProductsByID)
ProductRoute.get('/get/planet/:id', getProductsByPlanet)
ProductRoute.put('/update/:id', updateProduct)
ProductRoute.post('/comment/add/:id', isAuthenticated, addRating)
ProductRoute.delete('/delete/:id', deleteProduct)

export default ProductRoute