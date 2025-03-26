"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IError = void 0;
class IError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.IError = IError;
