"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@/shared");
const errorHandler = (err, req, res, next) => {
    console.log("errorHandler::error", err === null || err === void 0 ? void 0 : err.details);
    const errors = Array.from(err.details.entries()).map(([key, value]) => ({
        key,
        message: value.message,
        original: value._original,
        details: value.details
    }));
    console.log("validationErrorHandler ::errors", errors);
    return (0, shared_1.ApiResponse)(false, "Validation Error", errors, 422, res);
};
exports.default = errorHandler;
