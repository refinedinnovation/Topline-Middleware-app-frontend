"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationHandler = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const enum_1 = require("@/api/models/user/enum");
const token_1 = require("./token");
const RegistrationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.body;
    user.role = enum_1.UserRoles.USER;
    const addNewUser = yield (0, user_1.createUser)(user);
    const jwtData = {
        email: addNewUser.email,
        firstName: addNewUser.firstName,
        lastName: addNewUser.lastName,
        companyName: addNewUser.companyName,
        companyAddress: addNewUser.companyAddress,
        contactNumber: addNewUser.contactNumber,
        role: addNewUser.role,
        _id: ""
    };
    const token = (0, token_1.GenerateJwtToken)(jwtData);
    return (0, shared_1.ApiResponse)(true, "User Registered Successfully", { user: addNewUser, token }, 201, res);
});
exports.RegistrationHandler = RegistrationHandler;
