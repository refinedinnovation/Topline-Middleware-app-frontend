"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationHandler = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const enum_1 = require("@/api/models/user/enum");
const token_1 = require("./token");
const RegistrationHandler = async (req, res) => {
    const user = req?.body;
    user.role = enum_1.UserRoles.USER;
    const addNewUser = await (0, user_1.createUser)(user);
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
};
exports.RegistrationHandler = RegistrationHandler;
//# sourceMappingURL=registration.js.map