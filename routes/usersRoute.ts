import express from "express"
import { get } from "http"
import { authenticateUser } from '../middleware/authMiddleware'
import { registerUser, updateUser, deleteUser } from '../controllers/userController'

const userRoutes: express.Router = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.put('/update', updateUser)
userRoutes.delete('/delete', deleteUser)



export default userRoutes