"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJwtToken = void 0;
const enum_1 = require("./enum");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateJwtToken = (jwtData) => {
    var _a;
    const token = jsonwebtoken_1.default === null || jsonwebtoken_1.default === void 0 ? void 0 : jsonwebtoken_1.default.sign(jwtData, (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JWT_SECRET, { expiresIn: enum_1.JWTExpirationTime.ACCESS });
    return token;
};
exports.GenerateJwtToken = GenerateJwtToken;
