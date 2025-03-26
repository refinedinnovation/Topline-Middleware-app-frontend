"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const UpdateUser = async (req, res) => {
    const id = req?.params?._id;
    const user = req?.body;
    const updatedUser = await (0, user_1.updateUser)(id, user);
    return (0, shared_1.ApiResponse)(true, "User updated Successfully", updatedUser, 201, res);
};
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=updateUser.js.map