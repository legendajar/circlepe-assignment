import express from 'express'
import { addOrder, getOrder, getOrderByUserId, verifyOrder } from '../controllers/order.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const OrderRoute = express.Router()

OrderRoute.post('/add', isAuthenticated, addOrder)
OrderRoute.post('/verify', verifyOrder)
OrderRoute.get('/get/all', getOrder)
OrderRoute.get('/get/:id', isAuthenticated, getOrderByUserId)

export default OrderRoute