"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFtp = exports.bulkUpdate = exports.updateFtp = exports.createFtp = exports.createFtpInBulk = exports.getAll = exports.findFtpById = void 0;
const tslib_1 = require("tslib");
const CustomError_1 = require("@/utils/CustomError");
const ftp_1 = tslib_1.__importDefault(require("@/api/models/ftp/ftp"));
const findFtpById = async (id) => {
    const FtpData = await ftp_1.default.findById(id).lean();
    return FtpData;
};
exports.findFtpById = findFtpById;
const getAll = async () => {
    const users = await ftp_1.default.find().populate('user').populate('createdBy').lean();
    return users;
};
exports.getAll = getAll;
const createFtpInBulk = async (ftp) => {
    const newFtp = await ftp_1.default.insertMany(ftp);
    return newFtp;
};
exports.createFtpInBulk = createFtpInBulk;
const createFtp = async (ftp) => {
    const findFtp = await ftp_1.default.findOne({ $or: [{ host: ftp?.host, ftpUser: ftp?.ftpUser, path: ftp?.path }] }).lean();
    if (findFtp) {
        throw new CustomError_1.IError('Ftp already exists', 409);
    }
    return await ftp_1.default.create(ftp);
};
exports.createFtp = createFtp;
const updateFtp = async (id, user) => {
    const checkUser = await (0, exports.findFtpById)(id);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const updatedUser = await ftp_1.default.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
};
exports.updateFtp = updateFtp;
const bulkUpdate = async (ftp, userId, currentUser) => {
    await ftp_1.default.deleteMany({ user: userId });
    const FtpsToAdd = [...ftp];
    FtpsToAdd?.forEach(x => {
        x.createdBy = currentUser;
        x.user = userId;
    });
    const newFtps = await ftp_1.default.insertMany(FtpsToAdd);
    return newFtps;
};
exports.bulkUpdate = bulkUpdate;
const deleteFtp = async (id) => {
    const ftp = await (0, exports.findFtpById)(id);
    if (!ftp) {
        throw new Error('Ftp not found');
    }
    await ftp_1.default.findByIdAndDelete(id);
    return ftp;
};
exports.deleteFtp = deleteFtp;
//# sourceMappingURL=ftp.js.map