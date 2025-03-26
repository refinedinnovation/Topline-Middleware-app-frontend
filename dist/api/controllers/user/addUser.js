"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const AddUser = async (req, res) => {
    const user = req.body;
    const addNewUser = await (0, user_1.createUser)(user);
    return (0, shared_1.ApiResponse)(true, "New User Added Successfully", addNewUser, 201, res);
};
exports.AddUser = AddUser;
//# sourceMappingURL=addUser.js.map