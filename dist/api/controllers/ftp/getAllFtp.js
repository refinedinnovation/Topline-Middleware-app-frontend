"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFtp = void 0;
const ftp_1 = require("@/services/ftp/ftp");
const shared_1 = require("@/shared");
const getAllFtp = async (req, res) => {
    const allVendor = await (0, ftp_1.getAll)();
    return (0, shared_1.ApiResponse)(true, "All Vendor GET Successfully", allVendor, 200, res);
};
exports.getAllFtp = getAllFtp;
//# sourceMappingURL=getAllFtp.js.map