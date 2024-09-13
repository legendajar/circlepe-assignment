import express from 'express'
import { login, register } from '../controllers/admin.controller.js'


const AdminRoute = express.Router()

AdminRoute.post('/register', register)
AdminRoute.post('/login', login)

export default AdminRoute