import express from 'express'
import { deleteSpaceStation, getAllSpaceStation, getSpaceStationById, login, register, updateSpaceStation, logout, changePassword, addAddress } from '../controllers/space_station.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const SpaceStationRoute = express.Router()

SpaceStationRoute.post('/register', register)
SpaceStationRoute.post('/login', login)
SpaceStationRoute.post('/logout', logout)
SpaceStationRoute.get('/get/all', getAllSpaceStation)
SpaceStationRoute.get('/get/:id', getSpaceStationById)
SpaceStationRoute.put('/update/:id', updateSpaceStation)
SpaceStationRoute.delete('/delete/:id', deleteSpaceStation)
SpaceStationRoute.post('/change/password/:id', isAuthenticated, changePassword)
SpaceStationRoute.post('/add/address/:id', isAuthenticated, addAddress)
export default SpaceStationRoute