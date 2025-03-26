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
exports.DeleteFtp = void 0;
const shared_1 = require("@/shared");
const ftp_1 = require("@/services/ftp/ftp");
const DeleteFtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const deletedFtp = yield (0, ftp_1.deleteFtp)(_id);
    return (0, shared_1.ApiResponse)(true, "Ftp Deleted Successfully", deletedFtp, 200, res);
});
exports.DeleteFtp = DeleteFtp;
