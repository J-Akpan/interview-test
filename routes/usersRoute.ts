import express from "express"
import { get } from "http"
import { authenticateUser } from '../middleware/authMiddleware'
import { registerUser } from '../controllers/userController'

const userRoutes: express.Router = express.Router()

userRoutes.post('/register', registerUser)

export default userRoutes