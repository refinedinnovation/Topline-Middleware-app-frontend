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
exports.loginWithCredentials = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const token_1 = require("./token");
const loginWithCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req === null || req === void 0 ? void 0 : req.body;
    const loginUser = yield (0, user_1.loginWithEmail)(email, password);
    const jwtData = {
        _id: loginUser._id,
        email: loginUser.email,
        firstName: loginUser.firstName,
        lastName: loginUser.lastName,
        companyName: loginUser.companyName,
        companyAddress: loginUser.companyAddress,
        contactNumber: loginUser.contactNumber,
        role: loginUser.role,
        // userName: loginUser.userName
    };
    const token = (0, token_1.GenerateJwtToken)(jwtData);
    return (0, shared_1.ApiResponse)(true, "Login successful", { email, token }, 200, res);
});
exports.loginWithCredentials = loginWithCredentials;
