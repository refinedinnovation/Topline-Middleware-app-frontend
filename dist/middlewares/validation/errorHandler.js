"use strict";
// import { ApiResponse } from '@/shared';
// import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import { CustomError } from './types';
// // import { ErrorRequestHandler } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
// const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
//     console.log("errorHandler::error", err?.details)
//    const errors = Array.from((err as CustomError).details.entries()).map(([key, value]) => ({
//         key,
//         message: value.message,
//         original: value._original,
//         details: value.details
//       }));
//     console.log("validationErrorHandler ::errors", errors);
//     return ApiResponse(false, "Validation Error", errors, 422, res);
// };
// export default errorHandler;
const shared_1 = require("@/shared");
const errorHandler = (err, req, res, next) => {
    console.log("errorHandler::error", err);
    let errors = [];
    if (err && err.details) {
        const details = err.details;
        if (Array.isArray(details)) {
            errors = details.map((detail) => ({
                message: detail.message,
                original: detail._original || null,
                details: detail.details || null,
            }));
        }
        else if (typeof details === "object") {
            errors = Object.entries(details).map(([key, value]) => ({
                key,
                message: value?.message || "Unknown error",
                original: value?._original || null,
                details: value?.details || null,
            }));
        }
    }
    console.log("validationErrorHandler::errors", errors);
    (0, shared_1.ApiResponse)(false, "Validation Error", errors, 422, res);
    return; // Ensures function returns `void` as required by `ErrorRequestHandler`
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map