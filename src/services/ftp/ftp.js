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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFtp = exports.bulkUpdate = exports.updateFtp = exports.createFtp = exports.createFtpInBulk = exports.getAll = exports.findFtpById = void 0;
const CustomError_1 = require("@/utils/CustomError");
const ftp_1 = __importDefault(require("@/api/models/ftp/ftp"));
const findFtpById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const FtpData = yield ftp_1.default.findById(id).lean();
    return FtpData;
});
exports.findFtpById = findFtpById;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield ftp_1.default.find().populate('user').populate('createdBy').lean();
    return users;
});
exports.getAll = getAll;
const createFtpInBulk = (ftp) => __awaiter(void 0, void 0, void 0, function* () {
    const newFtp = yield ftp_1.default.insertMany(ftp);
    return newFtp;
});
exports.createFtpInBulk = createFtpInBulk;
const createFtp = (ftp) => __awaiter(void 0, void 0, void 0, function* () {
    const findFtp = yield ftp_1.default.findOne({ $or: [{ host: ftp === null || ftp === void 0 ? void 0 : ftp.host, ftpUser: ftp === null || ftp === void 0 ? void 0 : ftp.ftpUser, path: ftp === null || ftp === void 0 ? void 0 : ftp.path }] }).lean();
    if (findFtp) {
        throw new CustomError_1.IError('Ftp already exists', 409);
    }
    return yield ftp_1.default.create(ftp);
});
exports.createFtp = createFtp;
const updateFtp = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield (0, exports.findFtpById)(id);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const updatedUser = yield ftp_1.default.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
});
exports.updateFtp = updateFtp;
const bulkUpdate = (ftp, userId, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    yield ftp_1.default.deleteMany({ user: userId });
    const FtpsToAdd = [...ftp];
    FtpsToAdd === null || FtpsToAdd === void 0 ? void 0 : FtpsToAdd.forEach(x => {
        x.createdBy = currentUser;
        x.user = userId;
    });
    const newFtps = yield ftp_1.default.insertMany(FtpsToAdd);
    return newFtps;
});
exports.bulkUpdate = bulkUpdate;
const deleteFtp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ftp = yield (0, exports.findFtpById)(id);
    if (!ftp) {
        throw new Error('Ftp not found');
    }
    yield ftp_1.default.findByIdAndDelete(id);
    return ftp;
});
exports.deleteFtp = deleteFtp;
