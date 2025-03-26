"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
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
const ApiResponse = (status, // First argument should be a boolean
message, // Second argument should be a string
data, // Third argument should be any data
apiStatus = 200, // Fourth argument should be a number (HTTP status)
response // Fifth argument should be the Express `Response` object
) => {
    return response.status(apiStatus).json({
        status,
        message,
        data,
        timestamp: new Date().toISOString(),
    });
};
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=apiResponse.js.map