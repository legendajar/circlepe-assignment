import express from 'express'
import { deleteSpaceStation, getAllSpaceStation, getSpaceStationById, login, register, updateSpaceStation, logout } from '../controllers/space_station.controller.js'


const SpaceStationRoute = express.Router()

SpaceStationRoute.post('/register', register)
SpaceStationRoute.post('/login', login)
SpaceStationRoute.post('/logout', logout)
SpaceStationRoute.get('/get/all', getAllSpaceStation)
SpaceStationRoute.get('/get/:id', getSpaceStationById)
SpaceStationRoute.put('/update/:id', updateSpaceStation)
SpaceStationRoute.delete('/delete/:id', deleteSpaceStation)

export default SpaceStationRoute