import express from 'express'
import { addOrder, getOrder, getOrderByUserId } from '../controllers/order.controller.js'

const OrderRoute = express.Router()

OrderRoute.post('/add', addOrder)
OrderRoute.get('/get/all', getOrder)
OrderRoute.get('/get/:id', getOrderByUserId)

export default OrderRoute