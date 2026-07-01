import express from 'express'
import { register,otp, notGivenOTP, login, logOut,  } from '../controller/userController.js'
import jwtVerify from '../middleware/jwtVerify.js'
import isjwtVerify from '../middleware/isJWTvalid.js'

const route = express.Router()


route.post('/register',register)
route.post('/otp', jwtVerify, otp)
route.post('/login', isjwtVerify, login)
route.get('/logout', jwtVerify, logOut)
route.get('/notGivenOTP', jwtVerify, notGivenOTP)

export default route
