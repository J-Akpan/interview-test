import Joi, { string } from "joi"

export const addUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string().optional(),
    role: Joi.string().required(),
    experience: Joi.string().required(),
    education: Joi.string().required(),
    educationStartYear: Joi.string().required(),
    educationEndYear: Joi.string().required(),
    schoolName: Joi.string().required(),
    certification: Joi.string().required(),

})

export const updateUserValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().optional(),
    avatar: Joi.string().optional(),
    role: Joi.string().optional(),
    experience: Joi.string().optional(),
    education: Joi.string().optional(),
    educationStartYear: Joi.string().optional(),
    educationEndYear: Joi.string().optional(),
    schoolName: Joi.string().optional(),
    certification: Joi.string().optional(),

})