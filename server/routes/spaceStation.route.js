import express from 'express'
import { deleteSpaceStation, getAllSpaceStation, getSpaceStationById, login, register, updateSpaceStation, logout, changePassword, addAddress, forgotPassword, resetPasswordOTPVerification, resendOTP, resetPassword, deleteAddress } from '../controllers/space_station.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import spaceStationProfileImageUploader from '../middlewares/spaceStationProfileUploader.js'
import resetPasswordAuthentication from '../middlewares/resetPasswordAuthentication.js'

const SpaceStationRoute = express.Router()

SpaceStationRoute.post('/register', register)
SpaceStationRoute.post('/login', login)
SpaceStationRoute.post('/logout', logout)
SpaceStationRoute.get('/get/all', getAllSpaceStation)
SpaceStationRoute.get('/get/:id', getSpaceStationById)
SpaceStationRoute.put('/update/:id', spaceStationProfileImageUploader, isAuthenticated, updateSpaceStation)
SpaceStationRoute.delete('/delete/:id', deleteSpaceStation)
SpaceStationRoute.post('/change/password/:id', isAuthenticated, changePassword)
SpaceStationRoute.post('/add/address/:id', isAuthenticated, addAddress)
SpaceStationRoute.post('/reset/password', forgotPassword)
SpaceStationRoute.post('/reset/password/verification', resetPasswordAuthentication, resetPasswordOTPVerification)
SpaceStationRoute.post('/reset/password/otp/resend', resetPasswordAuthentication, resendOTP)
SpaceStationRoute.post('/password/reset', resetPasswordAuthentication, resetPassword)
SpaceStationRoute.delete('/deleteAddress/:id', deleteAddress)

export default SpaceStationRoute