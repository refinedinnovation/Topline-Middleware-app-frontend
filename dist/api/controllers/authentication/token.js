"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJwtToken = void 0;
const tslib_1 = require("tslib");
const enum_1 = require("./enum");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const GenerateJwtToken = (jwtData) => {
    const token = jsonwebtoken_1.default?.sign(jwtData, process?.env?.JWT_SECRET, { expiresIn: enum_1.JWTExpirationTime.ACCESS });
    return token;
};
exports.GenerateJwtToken = GenerateJwtToken;
//# sourceMappingURL=token.js.map