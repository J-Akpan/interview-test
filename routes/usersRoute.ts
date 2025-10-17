import express from "express"
import { get } from "http"
import { authenticateUser } from '../middleware/authMiddleware'
import { registerUser, updateUser, deleteUser, getUser, getAllUsers } from '../controllers/userController'

const userRoutes: express.Router = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.put('/update', updateUser)
userRoutes.delete('/delete', deleteUser)
userRoutes.get('/get', getUser)
userRoutes.get('/all', getAllUsers)




export default userRoutes