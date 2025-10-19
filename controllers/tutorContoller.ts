
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import dotenv from "dotenv";
import { Op, ValidationError, where } from "sequelize";
import { getSystemErrorMap } from "util";
dotenv.config();
import User from "../models/Users";
import { addUserValidation, updateUserValidation, deleteUserValication } from "../validation/userValidation"


//this is to create details where user register as tutor
export const registerTutor = async (req: AuthRequest, res: Response) => {
    try {
        const { bio, tutoredCourse } = req.body;
        const userId = req.user?.userId

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" })
    }
}