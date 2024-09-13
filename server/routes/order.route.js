import express from 'express'
import { addOrder, getOrder } from '../controllers/order.controller.js'

const OrderRoute = express.Router()

OrderRoute.post('/add', addOrder)
OrderRoute.get('/get/all', getOrder)
OrderRoute.get('/get/:id', getOr)

export default OrderRoute