"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const shared_1 = require("@/shared");
const Authentication = (req, res, next) => {
    try {
        const token = req?.headers?.authorization;
        if (!token) {
            return res.status(404).json({ status: false, msg: "Token is missing", data: null });
        }
        const verify = jsonwebtoken_1.default.verify(token, process?.env?.JWT_SECRET);
        if (!verify) {
            return res.status(401).json({ status: false, msg: "Un-Authorize", data: null });
        }
        console.log("Authentication::verify", verify);
        req.user = verify;
        return next();
    }
    catch (error) {
        console.log("Authentication::error", JSON?.stringify(error));
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
//# sourceMappingURL=auth.js.map