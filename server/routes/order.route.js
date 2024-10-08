import express from 'express'
import { addOrder, getOrder, getOrderByUserId, verifyOrder, getPlanetOrder, getPlanetSingleOrder } from '../controllers/order.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isPlanetAuthenticated from '../middlewares/isPlanetAuthenticated.js'

const OrderRoute = express.Router()

OrderRoute.post('/add', isAuthenticated, addOrder)
OrderRoute.post('/verify', verifyOrder)
OrderRoute.get('/get/all', getOrder)
OrderRoute.get('/get/:id', isAuthenticated, getOrderByUserId)
OrderRoute.get('/get/planet/:id', getPlanetOrder)
OrderRoute.get('/get/order/:id', isPlanetAuthenticated, getPlanetSingleOrder)

export default OrderRoute