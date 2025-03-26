"use strict";
// import { ApiResponse } from "@/shared";
// import { Request, Response } from "express";
// import _ from "lodash";
// import { createUser } from "@/services/user/user";
// import { UserRoles } from "@/api/models/user/enum";
// import { VendorInput } from "./types";
// import { createFtpInBulk } from "@/services/ftp/ftp";
// import { AuthenticatedRequest } from "@/middlewares/types";
// import { IFtp } from "@/api/models/ftp/types";
// import { Types } from "mongoose";
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
exports.AddVendor = void 0;
// export interface AuthenticatedRequest extends Request {
//     user: {
//         id: string;  // This ensures that `user.id` is always a string
//     };
// }
// export const AddVendor = async (req: AuthenticatedRequest, res: Response) => {
//     const user = req.body as VendorInput;
//     let password = '12345678';
//     user.password = password;
//     req.body.role = UserRoles.VENDOR;
//     const addNewVendor = await createUser(user);
//     let ftps;
//     if(addNewVendor?._id) {
//         let ftpData = user?.ftps;
//         ftpData?.forEach(x => {
//             x.createdBy = req?.user?.id as string; 
//             x.user = addNewVendor._id;  
//             x.isSecure = true;
//         })
//         console.log('ftpData', ftpData);
//         ftps = await createFtpInBulk(ftpData);
//     } else {
//         throw new Error('Member not created');
//     }
//     return ApiResponse(true, "New Member Added Successfully", {addNewVendor, ftps}, 201, res);
// }; 
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const enum_1 = require("@/api/models/user/enum");
const ftp_1 = require("@/services/ftp/ftp");
const AddVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    let password = '12345678';
    user.password = password;
    req.body.role = enum_1.UserRoles.VENDOR;
    const addNewVendor = yield (0, user_1.createUser)(user);
    let ftps;
    if (addNewVendor === null || addNewVendor === void 0 ? void 0 : addNewVendor._id) {
        let ftpData = user === null || user === void 0 ? void 0 : user.ftps;
        ftpData === null || ftpData === void 0 ? void 0 : ftpData.forEach(x => {
            var _a;
            x.createdBy = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.firstName;
            x.user = addNewVendor._id;
            x.isSecure = true;
        });
        console.log('ftpData', ftpData);
        ftps = yield (0, ftp_1.createFtpInBulk)(ftpData);
    }
    else {
        throw new Error('Member not created');
    }
    return (0, shared_1.ApiResponse)(true, "New Member Added Successfully", { addNewVendor, ftps }, 201, res);
});
exports.AddVendor = AddVendor;
// import { ApiResponse } from "@/shared";
// import { Request, Response } from "express";
// import _ from "lodash";
// import { createUser } from "@/services/user/user";
// import { UserRoles } from "@/api/models/user/enum";
// import { VendorInput } from "./types";
// import { createFtpInBulk } from "@/services/ftp/ftp";
// import { AuthenticatedRequest } from "@/middlewares/types";
// import { IFtp } from "@/api/models/ftp/types";
// import { Types } from "mongoose";
// export interface AuthenticatedRequest extends Request {
//     user: {
//         id: string;  // This ensures that `user.id` is always a string
//     };
// }
// export const AddVendor = async (req: AuthenticatedRequest, res: Response) => {
//     const user = req.body as VendorInput;
//     let password = '12345678';
//     user.password = password;
//     req.body.role = UserRoles.VENDOR;
//     const addNewVendor = await createUser(user);
//     let ftps;
//     if(addNewVendor?._id) {
//         let ftpData = user?.ftps;
//         ftpData?.forEach(x => {
//             x.createdBy = req?.user?.id as string; 
//             x.user = addNewVendor._id;  
//             x.isSecure = true;
//         })
//         console.log('ftpData', ftpData);
//         ftps = await createFtpInBulk(ftpData);
//     } else {
//         throw new Error('Member not created');
//     }
//     return ApiResponse(true, "New Member Added Successfully", {addNewVendor, ftps}, 201, res);
// }; 
// export const AddVendor = async (req: AuthenticatedRequest, res: Response) => {
//     const user = req.body as VendorInput;
//     let password = '12345678';
//     user.password = password;
//     req.body.role = UserRoles.VENDOR;
//     const addNewVendor = await createUser(user);
//     let ftps;
//     if (addNewVendor?._id) {
//         let ftpData = user?.ftps;
//         ftpData?.forEach(x => {
//             x.createdBy = req?.user?.id as string;  // This works because `user.id` is now typed as string
//             x.user = addNewVendor._id;
//             x.isSecure = true;
//         });
//         console.log('ftpData', ftpData);
//         ftps = await createFtpInBulk(ftpData);
//     } else {
//         throw new Error('Member not created');
//     }
//     return ApiResponse(true, "New Member Added Successfully", { addNewVendor, ftps }, 201, res);
// };
// export const AddVendor = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         const user = req.body as VendorInput;
//         console.log('Received user data:', user);
//         user.password = '12345678';
//         req.body.role = UserRoles.VENDOR;
//         const addNewVendor = await createUser(user);
//         console.log('Created user:', addNewVendor);
//         if (addNewVendor?._id) {
//             const ftpData = user?.ftps || [];
//             console.log('FTP data before processing:', ftpData);
//             if (!req.user || typeof req.user.id !== 'string') {
//                 throw new Error('User is not authenticated or id is not a string');
//             }
//             ftpData.forEach((x: any) => {
//                 x.createdBy = req.user!.id; // Safe to use after the check
//                 x.user = addNewVendor._id;
//                 x.isSecure = false;
//             });
//             const ftps = await createFtpInBulk(ftpData);
//             console.log('Created FTP entries:', ftps);
//             return res.status(201).json({
//                 success: true,
//                 message: "New Member Added Successfully",
//                 data: { addNewVendor, ftps }
//             });
//         } else {
//             throw new Error('Member not created');
//         }
//     } catch (error) {
//         console.error('Error in AddVendor:', error);
//         return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
//     }
// };
