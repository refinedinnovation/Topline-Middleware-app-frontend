"use strict";
// import { NextFunction, Response } from "express";
// import { AuthenticatedRequest } from "../types";
// import { ApiResponse } from "@/shared";
// import _ from "lodash";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const tslib_1 = require("tslib");
const shared_1 = require("@/shared");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const Authorization = (permission) => {
    return async (req, res, next) => {
        try {
            const role = String(req?.user?.role);
            console.log("Authorization::role", role);
            if (!role) {
                return void (0, shared_1.ApiResponse)(false, "Un-Authenticated, Role is not available", null, 500, res);
            }
            if (!lodash_1.default.isArray(permission)) {
                return void (0, shared_1.ApiResponse)(false, "Un-Authenticated, Role is not provided", null, 500, res);
            }
            if (role === "admin" || permission.includes(role)) {
                return void next();
            }
            return void (0, shared_1.ApiResponse)(false, "Un-Authorize, You are not allowed to access this resource", null, 401, res);
        }
        catch (error) {
            console.log("Authorization::error", JSON.stringify(error));
            return void (0, shared_1.ApiResponse)(false, "Something Went Wrong, Seems you are not authenticated while accessing", error, 500, res);
        }
    };
};
exports.Authorization = Authorization;
//# sourceMappingURL=auth.js.map