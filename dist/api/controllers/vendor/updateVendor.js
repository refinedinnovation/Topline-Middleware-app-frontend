"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const enum_1 = require("@/api/models/user/enum");
const ftp_1 = require("@/services/ftp/ftp");
const UpdateUser = async (req, res) => {
    const id = req?.params?._id;
    const user = req?.body;
    req.body.role = enum_1.UserRoles.VENDOR;
    const userToUpdate = {
        // userName:req?.body?.userName,
        email: req?.body?.email,
        firstName: req?.body?.firstName,
        lastName: req?.body.firstName,
        companyName: req?.body.companyName,
        companyAddress: req?.body.companyAddress,
        contactNumber: req?.body.contactNumber,
        role: req?.body?.role,
        password: '12345678'
    };
    const updatedUser = await (0, user_1.updateUser)(id, userToUpdate);
    // const updateFTP = await bulkUpdate(user?.ftps, updatedUser?._id as string, req?.user?.email as string)
    const updateFTP = await (0, ftp_1.bulkUpdate)(user?.ftps, updatedUser?._id ? updatedUser._id.toString() : "", req?.user?.email);
    return (0, shared_1.ApiResponse)(true, "Member Updated Successfully", { updatedUser, updateFTP }, 201, res);
};
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=updateVendor.js.map