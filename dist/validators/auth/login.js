"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithCredentials = void 0;
const celebrate_1 = require("celebrate");
exports.loginWithCredentials = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi?.object()?.keys({
        email: celebrate_1.Joi?.string()?.required(),
        password: celebrate_1.Joi?.string()?.min(5)?.max(30)?.required(),
    }),
};
//# sourceMappingURL=login.js.map