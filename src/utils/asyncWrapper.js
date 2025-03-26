"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncWrapper = void 0;
const shared_1 = require("@/shared");
const AsyncWrapper = (fn) => (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fn(req, res);
        return result;
    }
    catch (error) {
        console.log(error);
        const { message } = error;
        return (0, shared_1.ApiResponse)(false, message, error, 500, res);
    }
});
exports.AsyncWrapper = AsyncWrapper;
