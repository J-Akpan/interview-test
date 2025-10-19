
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import dotenv from "dotenv";
import { Op, ValidationError, where } from "sequelize";
import jwt from "jsonwebtoken";
import { getSystemErrorMap } from "util";
dotenv.config();
import User from "../models/Users";
import { addUserValidation, updateUserValidation, deleteUserValication } from "../validation/userValidation"



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
            experience,
            education,
            educationStartYear,
            educationEndYear,
            schoolName,
            certification,
            role
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


// update user information
export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId
        console.log(userId)
        const {
            name, email,
            role, experience, education,
            educationStartYear, educationEndYear,
            schoolName, certification } = req.body

        // validate input
        const { error } = updateUserValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ msg: error.details[0]?.message })
        }

        // check if user exist
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        // update user
        const updatedUser = await User.update({
            name, role, experience, education,
            educationStartYear, educationEndYear,
            schoolName, certification
        }, {
            where: { userId }
        })
        if (updatedUser) {
            return res.status(200).json({ msg: "User updated successfully" })
        }
        return res.status(400).json({ msg: "Invalid user data" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })

    }
}

// delete user
export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId
        // console.log(userId)

        // check if user exist
        const user = await User.findOne({ where: { userId } })
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        // delete user
        const deletedUser = await User.destroy({ where: { userId } })
        if (deletedUser) {
            return res.status(200).json({ msg: "User deleted successfully" })
        }
        return res.status(400).json({ msg: "Invalid user data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }

}


//get a particular user
export const getUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        // validate input
        const { error } = deleteUserValication.validate(req.body)
        if (error) {
            return res.status(400).json({ msg: error.details[0]?.message })
        }

        // check if user exist
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        return res.status(200).json({ msg: "User found", user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
}

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll()
        if (!users) {
            return res.status(404).json({ msg: "No users found" })
        }
        return res.status(200).json({ msg: "Users found", users })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
}

export const getToken = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // req.body Validation
        const { error } = deleteUserValication.validate(req.body);
        if (error) {
            return res.status(400).json({ msg: error.details[0]?.message });
        }

        // check if user exist
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // generate token
        const token = jwt.sign(
            { userId: user.userId, email: user.email, role: user.role, name: user.name },
            process.env.privateKey as string,
            { expiresIn: "1h" }
        );
        return res.status(200).json({ msg: "Token generated successfully", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error" });
    }
}