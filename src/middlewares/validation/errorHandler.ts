// import { ApiResponse } from '@/shared';
// import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import { CustomError } from './types';
// // import { ErrorRequestHandler } from 'express';


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
import { ApiResponse } from "@/shared";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "./types";

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction): void => {
    console.log("errorHandler::error", err);

    let errors: { key?: string; message: string; original?: any; details?: any }[] = [];

    if (err && (err as CustomError).details) {
        const details = (err as CustomError).details;
        
        if (Array.isArray(details)) {
            errors = details.map((detail) => ({
                message: detail.message,
                original: detail._original || null,
                details: detail.details || null,
            }));
        } else if (typeof details === "object") {
            errors = Object.entries(details).map(([key, value]: [string, any]) => ({
                key,
                message: value?.message || "Unknown error",
                original: value?._original || null,
                details: value?.details || null,
            }));
        }
    }

    console.log("validationErrorHandler::errors", errors);

    ApiResponse(false, "Validation Error", errors, 422, res);
    
    return; // Ensures function returns `void` as required by `ErrorRequestHandler`
};

export default errorHandler;
