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
exports.deleteVendor = exports.updateVendor = exports.addVendor = exports.getAllVendor = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("@/api/models/user/user"));
const enum_1 = require("@/api/models/user/enum");
const getAllVendor = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = { role: enum_1.UserRoles.VENDOR };
    const users = yield user_1.default.find(query).populate('ftps').lean();
    return users.map(user => {
        var _a;
        return (Object.assign(Object.assign({}, user), { ftps: ((_a = user.ftps) === null || _a === void 0 ? void 0 : _a.map((ftp) => ({
                host: ftp.host,
                ftpUser: ftp.ftpUser,
                password: "", // Mask FTP passwords
                path: ftp.path,
                isSecure: ftp.isSecure || false,
                user: ftp.user,
                createdBy: ftp.createdBy,
            }))) || [] }));
    });
});
exports.getAllVendor = getAllVendor;
const addVendor = (firstName, lastName, companyName, contactNumber, companyAddress, email, status, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = yield bcryptjs_1.default.hash('password123', 10);
        const newVendor = new user_1.default({
            firstName,
            lastName,
            companyName,
            companyAddress,
            contactNumber,
            email,
            status,
            password,
            role: enum_1.UserRoles.VENDOR
        });
        yield newVendor.save();
        return newVendor.toObject();
    }
    catch (error) {
        console.error('Error creating vendor:', error);
        return null;
    }
});
exports.addVendor = addVendor;
const updateVendor = (id, vendorData) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield user_1.default.findById(id);
    if (!vendor || vendor.role !== enum_1.UserRoles.VENDOR) {
        throw new Error('Vendor not found');
    }
    const newPassword = vendorData.password
        ? yield bcryptjs_1.default.hash(vendorData.password, 10)
        : vendor.password;
    const updatedVendor = yield user_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, vendorData), { password: newPassword }), { new: true });
    return updatedVendor;
});
exports.updateVendor = updateVendor;
// export const disableVendor = async (id: string, vendorData: UserInput): Promise<IUser | null> => {
//     const vendor = await User.findById(id);
//     if (!vendor || vendor.role !== UserRoles.VENDOR) {
//         throw new Error('Vendor not found');
//     }
//     const newPassword = await bcrypt.hash(vendorData.password, 10);
//     const disabledVendor = await User.findByIdAndUpdate(id, { ...vendorData, password: newPassword }, { new: true });
//     return disabledVendor;
// }
const deleteVendor = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield user_1.default.findById(_id);
    if (!vendor || vendor.role !== enum_1.UserRoles.VENDOR) {
        throw new Error('Vendor not found');
    }
    yield user_1.default.findByIdAndDelete(_id);
    return vendor;
});
exports.deleteVendor = deleteVendor;
// import bcrypt from 'bcryptjs';
// import User from '@/api/models/user/user';
// import { UserInput } from './types';
// import { IUser } from '@/api/models/user/type';
// import { UserRoles } from '@/api/models/user/enum';
// import { FtpInput } from "@/services/ftp/types";
// import { IFtp } from '@/api/models/ftp/types';
// import Ftp from '@/api/models/ftp/ftp';
// export interface VendorResponse {
//     firstName: string;
//     lastName: string;
//     // userName: string;
//     companyName: string;
//     companyAddress: string;
//     contactNumber: string;
//     password: string;
//     email: string;
//     role: string;
//     ftps: FtpInput[];
// }
// export const getAllVendor = async (): Promise<VendorResponse[]> => {
//     try {
//         const query = { role: UserRoles.VENDOR };
//         const users = await User.find(query).populate('ftps').lean();
//         return users.map((user: any) => ({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             userName: user.userName,
//             companyName: user.companyName,
//             companyAddress: user.companyAddress,
//             contactNumber: user.contactNumber,
//             password: "", 
//             email: user.email,
//             role: user.role,
//             ftps: (user.ftps || []).map((ftp: any) => ({
//                 host: ftp.host,
//                 ftpUser: ftp.ftpUser,
//                 password: "", // Mask FTP passwords in responses
//                 path: ftp.path,
//                 isSecure: ftp.isSecure || false,
//                 user: ftp.user,
//                 createdBy: ftp.createdBy,
//             })),
//         }));
//     } catch (error) {
//         console.error("Error fetching vendors:", error);
//         throw new Error("Failed to fetch vendors");
//     }
// };
// export const addVendor = async (
//     firstName: string,
//     lastName: string,
//     companyName: string,
//     // userName: string,
//     contactNumber: string,
//     companyAddress: string,
//     email: string,
//     status: string,
//     // password: string,
//     ftps:[],
// ): Promise<IUser | null> => {
//     try {
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const newVendor = new User({
//             firstName,
//             lastName,
//             // userName,
//             companyName,
//             companyAddress,
//             contactNumber,
//             email,
//             status,
//             // password: hashedPassword,
//             role: UserRoles.VENDOR,
//             ftps,
//         });
//         await newVendor.save();
//         return newVendor.toObject();
//     } catch (error) {
//         console.error('Error creating vendor:', error);
//         throw new Error('Failed to create vendor');
//     }
// };
// // export const updateVendor = async (id: string, vendorData: UserInput): Promise<IUser | null> => {
// //     try {
// //         const vendor = await User.findById(id);
// //         if (!vendor || vendor.role !== UserRoles.VENDOR) {
// //             throw new Error('Vendor not found or invalid role');
// //         }
// //         const hashedPassword = vendorData.password
// //             ? await bcrypt.hash(vendorData.password, 10)
// //             : vendor.password;
// //         const updatedVendor = await User.findByIdAndUpdate(
// //             id,
// //             { ...vendorData, password: hashedPassword },
// //             { new: true }
// //         );
// //         return updatedVendor;
// //     } catch (error) {
// //         console.error('Error updating vendor:', error);
// //         throw new Error('Failed to update vendor');
// //     }
// // };
// export const updateVendor = async (id: string, vendorData: UserInput): Promise<IUser | null> => {
//     try {
//         const vendor = await User.findById(id);
//         if (!vendor || vendor.role !== UserRoles.VENDOR) {
//             throw new Error('Vendor not found or invalid role');
//         }
//         const hashedPassword = vendorData.password
//             ? await bcrypt.hash(vendorData.password, 10)
//             : vendor.password;
//         const updatedVendor = await User.findByIdAndUpdate(
//             id,
//             {
//                 ...vendorData,
//                 password: hashedPassword,
//             },
//             { new: true } // This option returns the modified document instead of the original.
//         );
//         return updatedVendor ? updatedVendor.toObject() : null; // Make sure you return the object representation.
//     } catch (error) {
//         console.error('Error updating vendor:', error);
//         throw new Error('Failed to update vendor');
//     }
// };
// // export const deleteVendor = async (id: string): Promise<IUser | null> => {
// //     try {
// //         const vendor = await User.findById(id);
// //         if (!vendor || vendor.role !== UserRoles.VENDOR) {
// //             throw new Error('Vendor not found or invalid role');
// //         }
// //         await User.findByIdAndDelete(id);
// //         return vendor;
// //     } catch (error) {
// //         console.error('Error deleting vendor:', error);
// //         throw new Error('Failed to delete vendor');
// //     }
// // };
// export const deleteVendor = async (id: string): Promise<IUser | null> => {
//     try {
//         const vendor = await User.findById(id);
//         if (!vendor || vendor.role !== UserRoles.VENDOR) {
//             throw new Error('Vendor not found or invalid role');
//         }
//         const deletedVendor = await User.findByIdAndDelete(id);
//         return deletedVendor ? deletedVendor.toObject() : null; // Return the deleted vendor
//     } catch (error) {
//         console.error('Error deleting vendor:', error);
//         throw new Error('Failed to delete vendor');
//     }
// };
