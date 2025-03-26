"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewUser = exports.UserInput = void 0;
const enum_1 = require("@/api/models/user/enum");
const celebrate_1 = require("celebrate");
const userRolesValues = Object.values(enum_1.UserRoles);
exports.UserInput = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        firstName: celebrate_1.Joi.string().min(3).max(7).required(),
        lastName: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi?.string()?.email()?.required(),
        password: celebrate_1.Joi?.string()?.min(5)?.max(30)?.required(),
        companyName: celebrate_1.Joi.string().required(),
        companyAddress: celebrate_1.Joi.string().required(),
        contactNumber: celebrate_1.Joi.boolean().required(),
        role: celebrate_1.Joi.string().valid(...userRolesValues).required(),
    })
};
exports.AddNewUser = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        _id: celebrate_1.Joi.string().min(3).max(7),
        firstName: celebrate_1.Joi.string().min(3).max(7).required(),
        lastName: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi?.string()?.email()?.required(),
        password: celebrate_1.Joi?.string()?.min(5)?.max(30)?.required(),
        companyName: celebrate_1.Joi.string().required(),
        companyAddress: celebrate_1.Joi.string().required(),
        contactNumber: celebrate_1.Joi.boolean().required(),
        role: celebrate_1.Joi.string().valid(...userRolesValues).required(),
    })
};
//# sourceMappingURL=index.js.map