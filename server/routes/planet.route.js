import express from 'express'
import { addPlanet, deletePlanet, forgotPassword, forgotPasswordOTPVerification, getAllPlanet, getPlanetById, login, logout, OTPVerification, resetPassword, sendVerificationOTP, updatePlanet } from '../controllers/planet.controller.js'
import isPlanetAuthenticated from '../middlewares/isPlanetAuthenticated.js'


const PlanetRoute = express.Router()

PlanetRoute.post('/register', addPlanet)
PlanetRoute.post('/login', login)
PlanetRoute.post('/logout', isPlanetAuthenticated, logout)
PlanetRoute.get('/all', getAllPlanet)
PlanetRoute.get('/get/:id', getPlanetById)
PlanetRoute.put('/update/:id', isPlanetAuthenticated, updatePlanet)
PlanetRoute.delete('/delete/:id', deletePlanet)
PlanetRoute.post('/account/otp/send', sendVerificationOTP)
PlanetRoute.post('/account/verification/otp', OTPVerification)
PlanetRoute.post('/forgot/password/otp/send', forgotPassword)
PlanetRoute.post('/forgot/password/otp/verification', forgotPasswordOTPVerification)
PlanetRoute.post('/reset/password', resetPassword)

export default PlanetRoute