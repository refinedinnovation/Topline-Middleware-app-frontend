"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@/shared");
const Authentication = (req, res, next) => {
    var _a, _b;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            return res.status(404).json({ status: false, msg: "Token is missing", data: null });
        }
        const verify = jsonwebtoken_1.default.verify(token, (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.JWT_SECRET);
        if (!verify) {
            return res.status(401).json({ status: false, msg: "Un-Authorize", data: null });
        }
        console.log("Authentication::verify", verify);
        req.user = verify;
        return next();
    }
    catch (error) {
        console.log("Authentication::error", JSON === null || JSON === void 0 ? void 0 : JSON.stringify(error));
        return (0, shared_1.ApiResponse)(false, "Something Went Wrong, Seems you are not authenticated while accessing", null, 500, res);
    }
};
exports.Authentication = Authentication;
// import { NextFunction, Response } from "express";
// import jwt, { Secret } from "jsonwebtoken";
// import { AuthenticatedRequest } from "../types";  // Ensure this file defines the proper structure of 'user'
// import { ApiResponse } from "@/shared";
// export const Authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const token = req?.headers?.authorization as string;
//         if (!token) {
//             return res.status(404).json({ status: false, msg: "Token is missing", data: null });
//         }
//         // Verify the token
//         const verify = jwt.verify(token, process?.env?.JWT_SECRET as Secret);
//         if (!verify) {
//             return res.status(401).json({ status: false, msg: "Un-Authorize", data: null });
//         }
//         console.log("Authentication::verify", verify);
//         // Ensure the 'verify' result is of the correct type
//         req.user = verify as AuthenticatedRequest["user"];  // Type assertion
//         return next();
//     } catch (error) {
//         console.log("Authentication::error", JSON?.stringify(error));
//         return ApiResponse(false, "Something Went Wrong, Seems you are not authenticated while accessing", null, 500, res);
//     }
// };
