"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const shared_1 = require("@/shared");
const lodash_1 = __importDefault(require("lodash"));
const Authorization = (permission) => {
    return (req, res, next) => {
        var _a;
        try {
            const role = String((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role);
            console.log("Authorization::role", role);
            if (!role) {
                (0, shared_1.ApiResponse)(false, "Un-Authenticated, Role is not available", null, 500, res);
            }
            if (!(lodash_1.default === null || lodash_1.default === void 0 ? void 0 : lodash_1.default.isArray(permission))) {
                (0, shared_1.ApiResponse)(false, "Un-Authenticated, Role is not provided", null, 500, res);
            }
            if (role === "admin") {
                return next();
            }
            if ((permission === null || permission === void 0 ? void 0 : permission.some((p) => p === role))) {
                return next();
            }
            // return next();
            return (0, shared_1.ApiResponse)(false, "Un-Authorize, You are not allowed to access this resource", null, 401, res);
        }
        catch (error) {
            console.log("Authorization::error", JSON === null || JSON === void 0 ? void 0 : JSON.stringify(error));
            return (0, shared_1.ApiResponse)(false, "Something Went Wrong, Seems you are not authenticated while accessing", error, 500, res);
        }
    };
};
exports.Authorization = Authorization;
