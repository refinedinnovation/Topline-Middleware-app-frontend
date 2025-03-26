"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const Delete = async (req, res) => {
    const email = req?.params?.email;
    const DeletedUser = await (0, user_1.deleteUser)(email);
    return (0, shared_1.ApiResponse)(true, "User Deleted Successfully", DeletedUser, 201, res);
};
exports.Delete = Delete;
//# sourceMappingURL=deleteUser.js.map