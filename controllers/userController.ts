
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import dotenv from "dotenv";
import { Op, ValidationError } from "sequelize";
import { getSystemErrorMap } from "util";
dotenv.config();
import User from "../models/Users";
import { addUserValidation } from "../validation/userValidation"

//register user
// @desc Register a new user
// @route POST /api/users/register
// @access Public

// logic flow
// 1. Receive user details from request body
// 2. Hash the nickName using bcrypt
// 3. Create a new user record in the database with the hashed nickName

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, avatar, role, experience, education,
            educationStartYear, educationEndYear, schoolName, certification
        } = req.body

        // req.boddy ValidationError
        const { error } = addUserValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ msg: error.details[0]?.message })
        }

        // check if user exist 
        const userExists = await User.findOne({ where: { email } })
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" })
        }

        // create user
        const user = await User.create({
            name,
            email,
            avatar,
            role,
            experience,
            education,
            educationStartYear,
            educationEndYear,
            schoolName,
            certification
        })
        if (user) {
            return res.status(201).json({ msg: "User created successfully", user })
        }
        return res.status(400).json({ msg: "Invalid user data" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" })
    }
}