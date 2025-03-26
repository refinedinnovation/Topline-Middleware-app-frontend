"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithEmail = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAll = exports.findById = exports.findByEmail = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const user_1 = tslib_1.__importDefault(require("@/api/models/user/user"));
const CustomError_1 = require("@/utils/CustomError");
const ftp_1 = tslib_1.__importDefault(require("@/api/models/ftp/ftp"));
const findByEmail = async (email) => {
    const user = await user_1.default.findOne({ email }).lean().exec();
    return user;
};
exports.findByEmail = findByEmail;
const findById = async (_id) => {
    const user = await user_1.default.findById({ _id }).lean().exec();
    return user;
};
exports.findById = findById;
const getAll = async (isVendorOnly = false) => {
    const query = { isVendorOnly };
    const users = await user_1.default.find(query).populate('ftps'); // Don't use lean()
    return users;
};
exports.getAll = getAll;
const createUser = async (user) => {
    const findUser = await user_1.default.findOne({ $or: [{ email: user?.email }, { username: user?.firstName }] }).lean();
    if (findUser) {
        throw new CustomError_1.IError('Vendor already exists', 409);
    }
    const password = await bcryptjs_1.default?.hash(user.password, 10);
    const newUser = new user_1.default({ ...user, password });
    return await newUser.save();
};
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
const updateUser = async (email, user) => {
    const checkUser = await (0, exports.findByEmail)(email);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const newPassword = await bcryptjs_1.default?.hash(user.password, 10);
    const updatedUser = await user_1.default.findByIdAndUpdate(email, { ...user, password: newPassword }, { new: true });
    return updatedUser;
};
exports.updateUser = updateUser;
const deleteUser = async (email) => {
    // await User.findOne({ $or: [{ email: user?.email }, { id: user?._id }] }).lean();
    const checkUser = await (0, exports.findByEmail)(email);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const vendor = await user_1.default.findByIdAndDelete();
    if (!vendor) {
        throw new CustomError_1.IError('Vendor not found', 404);
    }
    await ftp_1.default.deleteMany({});
    return checkUser;
};
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
const loginWithEmail = async (user, password) => {
    // Find the user by email or username
    const findUser = await user_1.default.findOne({ $or: [{ email: user }, { userName: user }] }).lean();
    // Check if the user exists
    if (!findUser) {
        throw new CustomError_1.IError('Invalid Credentials', 401);
    }
    // Verify the password
    const isMatch = await bcryptjs_1.default.compare(password, findUser.password);
    if (!isMatch) {
        throw new CustomError_1.IError('Invalid Credentials', 401);
    }
    return findUser;
};
exports.loginWithEmail = loginWithEmail;
//# sourceMappingURL=user.js.map