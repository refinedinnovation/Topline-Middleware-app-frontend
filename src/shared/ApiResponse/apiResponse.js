"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
// const ApiResponse = (status, message, data, apiStatus = 200, response) => {
//     return response.status(apiStatus).json({
//         status,
//         message,
//         data,
//         response,
//         timestamp: new Date().toISOString(),
//     });
// };
const ApiResponse = (res, status, message, data = {}) => {
    let responseData = {};
    try {
        responseData = JSON.parse(JSON.stringify(data));
    } catch (error) {
        responseData = { error: "Data contains circular structure" };
    }
    res.status(status).json({ message, data: responseData });
};

exports.ApiResponse = ApiResponse;
