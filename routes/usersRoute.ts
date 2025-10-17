import express from "express"
import { get } from "http"
import { authenticateUser } from '../middleware/authMiddleware'
import { registerUser, updateUser, deleteUser, getUser } from '../controllers/userController'

const userRoutes: express.Router = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.put('/update', updateUser)
userRoutes.delete('/delete', deleteUser)
userRoutes.get('/get', getUser)




export default userRoutes