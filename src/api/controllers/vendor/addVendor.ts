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
import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { createUser } from "@/services/user/user";
import { UserRoles } from "@/api/models/user/enum";
import { VendorInput } from "./types";
import { createFtpInBulk } from "@/services/ftp/ftp";
import { AuthenticatedRequest } from "@/middlewares/types";  // Correct import
import { IFtp } from "@/api/models/ftp/types";

 


export const AddVendor = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.body as VendorInput;
    let password = '12345678';
    user.password = password;
    req.body.role = UserRoles.VENDOR;

    const addNewVendor = await createUser(user);
    let ftps;
    if (addNewVendor?._id) {
        let ftpData = user?.ftps;
        ftpData?.forEach(x => {
            x.createdBy = req?.user?.firstName as string;  
            // x.user = addNewVendor._id as string;
            x.user = addNewVendor._id.toString();
            x.isSecure = true;
        });
        console.log('ftpData', ftpData);
        ftps = await createFtpInBulk(ftpData);
    } else {
        throw new Error('Member not created');
    }
    // return ApiResponse(true, "New Member Added Successfully", { addNewVendor, ftps }, 201, res);
    return ApiResponse(true, "New Member Added Successfully", { addNewVendor, ftps }, 201, res);
};
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





