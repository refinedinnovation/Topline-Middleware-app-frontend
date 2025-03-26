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
exports.UpdateUser = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const enum_1 = require("@/api/models/user/enum");
const ftp_1 = require("@/services/ftp/ftp");
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a._id;
    const user = req === null || req === void 0 ? void 0 : req.body;
    req.body.role = enum_1.UserRoles.VENDOR;
    const userToUpdate = {
        // userName:req?.body?.userName,
        email: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.email,
        firstName: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.firstName,
        lastName: req === null || req === void 0 ? void 0 : req.body.firstName,
        companyName: req === null || req === void 0 ? void 0 : req.body.companyName,
        companyAddress: req === null || req === void 0 ? void 0 : req.body.companyAddress,
        contactNumber: req === null || req === void 0 ? void 0 : req.body.contactNumber,
        role: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.role,
        password: '12345678'
    };
    const updatedUser = yield (0, user_1.updateUser)(id, userToUpdate);
    const updateFTP = yield (0, ftp_1.bulkUpdate)(user === null || user === void 0 ? void 0 : user.ftps, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id, (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.email);
    return (0, shared_1.ApiResponse)(true, "Member Updated Successfully", { updatedUser, updateFTP }, 201, res);
});
exports.UpdateUser = UpdateUser;
