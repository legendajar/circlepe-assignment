import express from 'express'
import { createTransaction, viewTransaction, viewTransactionById } from '../controllers/transaction.controller.js'

const TransactionRoute = express.Router()

TransactionRoute.post('/create', createTransaction)
TransactionRoute.get('/get/all', viewTransaction)
TransactionRoute.get('/get/:id', viewTransactionById)

export default TransactionRoute