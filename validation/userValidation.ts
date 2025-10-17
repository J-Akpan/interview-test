import Joi, { string } from "joi"

export const addUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string().required(),
    role: Joi.string().required(),
    experience: Joi.string().required(),
    education: Joi.string().required(),
    educationStartYear: Joi.string().required(),
    educationEndYear: Joi.string().required(),
    schoolName: Joi.string().required(),
    certification: Joi.string().required(),

})