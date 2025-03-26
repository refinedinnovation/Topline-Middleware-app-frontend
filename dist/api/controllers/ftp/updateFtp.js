"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFtp = void 0;
const shared_1 = require("@/shared");
const ftp_1 = require("@/services/ftp/ftp");
const UpdateFtp = async (req, res) => {
    const data = req.body;
    const ftpToUpdate = await (0, ftp_1.updateFtp)(req?.params?._id, data);
    return (0, shared_1.ApiResponse)(true, "Ftp Updated Successfully", ftpToUpdate, 201, res);
};
exports.UpdateFtp = UpdateFtp;
//# sourceMappingURL=updateFtp.js.map