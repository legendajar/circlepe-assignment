import express from 'express'
import { login, logout, register } from '../controllers/admin.controller.js'


const AdminRoute = express.Router()

AdminRoute.post('/register', register)
AdminRoute.post('/login', login)
AdminRoute.post('/logout', logout)

export default AdminRoute