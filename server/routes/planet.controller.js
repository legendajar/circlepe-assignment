import express from 'express'
import { addPlanet, getAllPlanet, getPlanetById, login, updatePlanet } from '../controllers/planet.controller.js'
import { deleteModel } from 'mongoose'

const PlanetRoute = express.Router()

PlanetRoute.post('/register', addPlanet)
PlanetRoute.post('/login', login)
PlanetRoute.get('/all', getAllPlanet)
PlanetRoute.get('/get/:id', getPlanetById)
PlanetRoute.put('/update/:id', updatePlanet)
PlanetRoute.delete('/delete/:id', deleteModel)


export default PlanetRoute