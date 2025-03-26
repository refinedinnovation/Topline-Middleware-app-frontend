"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMongooseId = exports.email = exports.verifyEmailOnly = void 0;
const celebrate_1 = require("celebrate");
exports.verifyEmailOnly = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.string().custom((value, helpers) => {
        if (exports.email) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'MongoDB email')
};
exports.email = celebrate_1.Joi.string().custom((value, helpers) => {
    if (exports.email) {
        return helpers.error('any.invalid');
    }
    return value;
}, 'MongoDB email');
exports.verifyMongooseId = {
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi?.string()?.email(),
    })
};
//# sourceMappingURL=index.js.map