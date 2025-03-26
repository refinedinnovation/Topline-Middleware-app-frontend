import { Response } from "express";
import { ApiResponseParams } from './types';

// export const ApiResponse = (
//     status: boolean,
//     message: string,
//     data: any,
//     apiStatus = 200,
//     response: Response
// ) => {
//     return response.status(apiStatus).json({
//         status,
//         message,
//         data,
//         timestamp: new Date().toISOString(),
//     });
// };

export const ApiResponse = (
    status: boolean,      // First argument should be a boolean
    message: string,      // Second argument should be a string
    data: any,            // Third argument should be any data
    apiStatus = 200,      // Fourth argument should be a number (HTTP status)
    response: Response    // Fifth argument should be the Express `Response` object
) => {
    return response.status(apiStatus).json({
        status,
        message,
        data,
        timestamp: new Date().toISOString(),
    });
};
