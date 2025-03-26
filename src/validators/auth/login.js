"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithCredentials = void 0;
const celebrate_1 = require("celebrate");
exports.loginWithCredentials = {
    [celebrate_1.Segments.BODY]: (_a = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.object()) === null || _a === void 0 ? void 0 : _a.keys({
        email: (_b = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _b === void 0 ? void 0 : _b.required(),
        password: (_e = (_d = (_c = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _c === void 0 ? void 0 : _c.min(5)) === null || _d === void 0 ? void 0 : _d.max(30)) === null || _e === void 0 ? void 0 : _e.required(),
    }),
};
