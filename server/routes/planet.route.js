import express from 'express'
import { addPlanet, deletePlanet, getAllPlanet, getPlanetById, login, logout, updatePlanet } from '../controllers/planet.controller.js'
import isPlanetAuthenticated from '../middlewares/isPlanetAuthenticated.js'


const PlanetRoute = express.Router()

PlanetRoute.post('/register', addPlanet)
PlanetRoute.post('/login', login)
PlanetRoute.post('/logout', isPlanetAuthenticated, logout)
PlanetRoute.get('/all', getAllPlanet)
PlanetRoute.get('/get/:id', getPlanetById)
PlanetRoute.put('/update/:id', isPlanetAuthenticated, updatePlanet)
PlanetRoute.delete('/delete/:id', deletePlanet)


export default PlanetRoute