import express from 'express'
import { addCart, deleteCart, updateCart, viewCart } from '../controllers/cart.controller.js'

const CartRoute = express.Router()

CartRoute.post('/add', addCart)
CartRoute.get('/get/:id', viewCart)
CartRoute.put('/update/:id', updateCart)
CartRoute.delete('/delete/:id', deleteCart)

export default CartRoute