import express from 'express'
import { addOrder, getOrder, getOrderByUserId, verifyOrder } from '../controllers/order.controller.js'

const OrderRoute = express.Router()

OrderRoute.post('/add', addOrder)
OrderRoute.post('/verify', verifyOrder)
OrderRoute.get('/get/all', getOrder)
OrderRoute.get('/get/:id', getOrderByUserId)

export default OrderRoute