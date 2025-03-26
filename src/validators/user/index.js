"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewUser = exports.UserInput = void 0;
const enum_1 = require("@/api/models/user/enum");
const celebrate_1 = require("celebrate");
const userRolesValues = Object.values(enum_1.UserRoles);
exports.UserInput = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        firstName: celebrate_1.Joi.string().min(3).max(7).required(),
        lastName: celebrate_1.Joi.string().required(),
        email: (_b = (_a = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _a === void 0 ? void 0 : _a.email()) === null || _b === void 0 ? void 0 : _b.required(),
        password: (_e = (_d = (_c = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _c === void 0 ? void 0 : _c.min(5)) === null || _d === void 0 ? void 0 : _d.max(30)) === null || _e === void 0 ? void 0 : _e.required(),
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
        email: (_g = (_f = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _f === void 0 ? void 0 : _f.email()) === null || _g === void 0 ? void 0 : _g.required(),
        password: (_k = (_j = (_h = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _h === void 0 ? void 0 : _h.min(5)) === null || _j === void 0 ? void 0 : _j.max(30)) === null || _k === void 0 ? void 0 : _k.required(),
        companyName: celebrate_1.Joi.string().required(),
        companyAddress: celebrate_1.Joi.string().required(),
        contactNumber: celebrate_1.Joi.boolean().required(),
        role: celebrate_1.Joi.string().valid(...userRolesValues).required(),
    })
};
