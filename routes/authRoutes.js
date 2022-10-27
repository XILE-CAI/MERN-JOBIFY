import express from "express"
const router = express.Router()

import {register,login,updateUser} from "../controllers/authController.js"
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)

//update user must be restricted by auth user
router.route('/updateUser').patch(authenticateUser,updateUser)

export default router