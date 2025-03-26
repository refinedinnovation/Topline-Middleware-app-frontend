"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFtp = void 0;
const shared_1 = require("@/shared");
const ftp_1 = require("@/services/ftp/ftp");
const DeleteFtp = async (req, res) => {
    const { _id } = req.params;
    const deletedFtp = await (0, ftp_1.deleteFtp)(_id);
    return (0, shared_1.ApiResponse)(true, "Ftp Deleted Successfully", deletedFtp, 200, res);
};
exports.DeleteFtp = DeleteFtp;
//# sourceMappingURL=deleteFtp.js.map