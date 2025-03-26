import { UserRoles } from '@/api/models/user/enum';
import {Joi, Segments} from 'celebrate';

const userRolesValues = Object.values(UserRoles); 

export const UserInput = {
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().min(3).max(7).required(),
        lastName: Joi.string().required(),
        email: Joi?.string()?.email()?.required(),
        password: Joi?.string()?.min(5)?.max(30)?.required(),
        companyName: Joi.string().required(),
        companyAddress: Joi.string().required(),
        contactNumber: Joi.boolean().required(),
        role: Joi.string().valid(...userRolesValues).required(),
    })
}

export const AddNewUser = {
    [Segments.BODY]: Joi.object().keys({
        _id:Joi.string().min(3).max(7),
        firstName: Joi.string().min(3).max(7).required(),
        lastName: Joi.string().required(),
        email: Joi?.string()?.email()?.required(),
        password: Joi?.string()?.min(5)?.max(30)?.required(),
        companyName: Joi.string().required(),
        companyAddress: Joi.string().required(),
        contactNumber: Joi.boolean().required(),
        role: Joi.string().valid(...userRolesValues).required(),
    })
}

