
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import dotenv from "dotenv";
import { Op, ValidationError, where } from "sequelize";
import { getSystemErrorMap } from "util";
dotenv.config();
import User from "../models/Users";
import { addUserValidation, updateUserValidation, deleteUserValication } from "../validation/userValidation"


//register user
// @desc Register a new user
// @route POST /api/users/register
// @access Public

// export const registerUser = async (req: Request, res: Response) => {
//     try {
//         const
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: "Server error" })
//     }
// }