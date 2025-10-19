import express from "express"
import { get } from "http"
import { authenticateUser } from '../middleware/authMiddleware'
import {registerTutor } from '../controllers/tutorContoller'

const tutorRoutes = express.Router()

tutorRoutes.post('/register', authenticateUser, registerTutor)

export default tutorRoutes;