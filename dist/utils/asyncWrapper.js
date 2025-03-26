"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncWrapper = void 0;
const shared_1 = require("@/shared");
const AsyncWrapper = (fn) => async (req, res, Next) => {
    try {
        const result = await fn(req, res);
        return result;
    }
    catch (error) {
        console.log(error);
        // return ApiResponse(false, error, 500, res, Next);
        return (0, shared_1.ApiResponse)(false, error.message, status, 500);
    }
};
exports.AsyncWrapper = AsyncWrapper;
//# sourceMappingURL=asyncWrapper.js.map