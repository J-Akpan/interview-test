import express from "express"
import { get } from "http"
import { authenticateUser } from '../middleware/authMiddleware'
import { registerUser, updateUser, deleteUser, getUser, getAllUsers, getToken } from '../controllers/userController'

const userRoutes: express.Router = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.put('/update', authenticateUser, updateUser)
userRoutes.delete('/delete', authenticateUser, deleteUser)
userRoutes.get('/get', getUser)
userRoutes.get('/all', getAllUsers)
userRoutes.post('/token', getToken)





export default userRoutes