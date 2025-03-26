// "use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMongooseId = exports.objectId = exports.verifyEmailOnly = void 0;
const celebrate_1 = require("celebrate");
const mongoose_1 = require("mongoose");
exports.verifyEmailOnly = {
    [celebrate_1.Segments.BODY]: (_a = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.object()) === null || _a === void 0 ? void 0 : _a.keys({
        email: (_c = (_b = celebrate_1.Joi === null || celebrate_1.Joi === void 0 ? void 0 : celebrate_1.Joi.string()) === null || _b === void 0 ? void 0 : _b.email()) === null || _c === void 0 ? void 0 : _c.required(),
    }),
};
exports.objectId = celebrate_1.Joi.string().custom((value, helpers) => {
    if (!mongoose_1.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
}, 'MongoDB ObjectId');
exports.verifyMongooseId = {
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        id: exports.objectId.required()
    })
};
