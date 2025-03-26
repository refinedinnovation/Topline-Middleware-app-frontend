"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUser = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const GetAllUser = async (req, res) => {
    const fields = await (0, user_1.getAll)();
    return (0, shared_1.ApiResponse)(true, "Users Fetched Successfully", fields, 200, res);
};
exports.GetAllUser = GetAllUser;
//# sourceMappingURL=getAllUsers.js.map