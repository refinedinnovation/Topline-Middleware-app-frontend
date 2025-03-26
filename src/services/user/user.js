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
exports.loginWithEmail = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAll = exports.findById = exports.findByEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("@/api/models/user/user"));
const CustomError_1 = require("@/utils/CustomError");
const ftp_1 = __importDefault(require("@/api/models/ftp/ftp"));
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email }).lean().exec();
    return user;
});
exports.findByEmail = findByEmail;
const findById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(_id).lean();
    return user;
});
exports.findById = findById;
const getAll = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (isVendorOnly = false) {
    const query = { isVendorOnly };
    const users = yield user_1.default.find(query).populate('ftps'); // Don't use lean()
    return users;
});
exports.getAll = getAll;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_1.default.findOne({ $or: [{ email: user === null || user === void 0 ? void 0 : user.email }, { username: user === null || user === void 0 ? void 0 : user.firstName }] }).lean();
    if (findUser) {
        throw new CustomError_1.IError('Vendor already exists', 409);
    }
    const password = yield (bcryptjs_1.default === null || bcryptjs_1.default === void 0 ? void 0 : bcryptjs_1.default.hash(user.password, 10));
    const newUser = new user_1.default(Object.assign(Object.assign({}, user), { password }));
    return yield newUser.save();
});
exports.createUser = createUser;
// export const disableUser = async (id: string, user: UserInput): Promise<IUser> => {
//     const findUser = await User.findOne({ $or: [{ email: user?.email }, { username: user?.userName }] }).lean();
//     if (findUser) {
//         throw new IError('Vendor already exists', 409);
//     }
//     const password = await bcrypt?.hash(user.password, 10);
//     const newUser = new User({ ...user, password });
//     return await newUser.save(); 
// };
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield (0, exports.findById)(id);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const newPassword = yield (bcryptjs_1.default === null || bcryptjs_1.default === void 0 ? void 0 : bcryptjs_1.default.hash(user.password, 10));
    const updatedUser = yield user_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, user), { password: newPassword }), { new: true });
    return updatedUser;
});
exports.updateUser = updateUser;
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield (0, exports.findByEmail)(email);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const vendor = yield user_1.default.findByIdAndDelete(email);
    if (!vendor) {
        throw new CustomError_1.IError('Vendor not found', 404);
    }
    yield ftp_1.default.deleteMany({ user: email });
    return checkUser;
});
exports.deleteUser = deleteUser;
// export const loginWithEmail: (arg0: string, arg1: string) => any (user: string, password: string) => {
//     const findUser = await User.findOne({ $or: [{ email: user }, { username: user }] }).lean();
//     if (!findUser) {
//         throw new IError('Invalid Credentials', 401);
//     }
//     const isMatch = await bcrypt.compare(password, findUser?.password);
//     if (!isMatch) {
//         throw new IError('Invalid Credentials', 401);
//     }
//     return findUser;
// }; 
const loginWithEmail = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by email or username
    const findUser = yield user_1.default.findOne({ $or: [{ email: user }, { userName: user }] }).lean();
    // Check if the user exists
    if (!findUser) {
        throw new CustomError_1.IError('Invalid Credentials', 401);
    }
    // Verify the password
    const isMatch = yield bcryptjs_1.default.compare(password, findUser.password);
    if (!isMatch) {
        throw new CustomError_1.IError('Invalid Credentials', 401);
    }
    return findUser;
});
exports.loginWithEmail = loginWithEmail;
