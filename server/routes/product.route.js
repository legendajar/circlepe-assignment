import express from 'express'
import { addProduct, addRating, deleteProduct, getProducts, getProductsByID, getProductsByPlanet, updateProduct } from '../controllers/product.controller.js'
import productImageUploader from '../middlewares/productImageUploader.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isPlanetAuthenticated from '../middlewares/isPlanetAuthenticated.js'

const ProductRoute = express.Router()

ProductRoute.post('/add', isPlanetAuthenticated, productImageUploader, addProduct)
ProductRoute.get('/get/all', getProducts)
ProductRoute.get('/get/:id', getProductsByID)
ProductRoute.get('/get/planet/:id', getProductsByPlanet)
ProductRoute.put('/update/:id', isPlanetAuthenticated, productImageUploader, updateProduct)
ProductRoute.post('/comment/add/:id', isAuthenticated, addRating)
ProductRoute.delete('/delete/:id', deleteProduct)

export default ProductRoute