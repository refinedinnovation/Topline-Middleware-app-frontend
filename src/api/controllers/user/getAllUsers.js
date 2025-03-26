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
exports.GetAllUser = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const GetAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = yield (0, user_1.getAll)();
    return (0, shared_1.ApiResponse)(true, "Users Fetched Successfully", fields, 200, res);
});
exports.GetAllUser = GetAllUser;
