"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFtp = void 0;
const shared_1 = require("@/shared");
const ftp_1 = require("@/services/ftp/ftp");
const AddFtp = async (req, res) => {
    const data = req.body;
    req.body.createdBy = req?.user?.firstName;
    req.body.isSecure = true;
    const newFtp = await (0, ftp_1.createFtp)(data);
    return (0, shared_1.ApiResponse)(true, "New Ftp Added Successfully", newFtp, 201, res);
};
exports.AddFtp = AddFtp;
//# sourceMappingURL=addFtp.js.map