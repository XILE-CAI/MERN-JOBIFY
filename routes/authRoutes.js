import express from "express"
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max:10,
    message:'too many request from this ip'
})

import {register,login,updateUser} from "../controllers/authController.js"
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)

//update user must be restricted by auth user
router.route('/updateUser').patch(authenticateUser,updateUser)

export default router