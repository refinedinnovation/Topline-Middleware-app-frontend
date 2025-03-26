// import bcrypt from 'bcryptjs';
// import User from '@/api/models/user/user';
// import { UserInput } from './types';
// import { IUser } from '@/api/models/user/type';
// import { UserRoles } from '@/api/models/user/enum';
// import { FtpInput } from "@/services/ftp/types";
// import { IFtp } from '@/api/models/ftp/types';
// import { ObjectId } from 'mongodb';


// export interface VendorResponse {
// _id:ObjectId;
//     firstName: string;
//     lastName: string;
//     companyName: string;
//     companyAddress: string;
//     contactNumber: string;
//     password:string;
//     email: string;
//     role: string;
//     ftps: FtpInput[];  
// }

// export const getAllVendor = async (): Promise<VendorResponse[]> => {
//     const query = { role: UserRoles.VENDOR };
//     const users = await User.find(query).populate('ftps').lean();

//     return users.map(user => ({
//         ...user,
//         ftps: user.ftps?.map((ftp: IFtp) => ({
//             host: ftp.host,
//             ftpUser: ftp.ftpUser,
//             password: "", // Mask FTP passwords
//             path: ftp.path,
//             isSecure: ftp.isSecure || false,
//             user: ftp.user,
//             createdBy: ftp.createdBy,
//         })) || [] 
//     }));
// };


// export const addVendor = async (firstName: string, lastName:string,companyName:string,contactNumber:string, companyAddress:string, email: string,status:string,password:string,): Promise<IUser | null> => {
//     try {
//         const password = await bcrypt.hash('password123', 10);
//         const newVendor = new User({

//             firstName,
//             lastName,
//             companyName,
//             companyAddress,
//             contactNumber,
//             email,
//              status,
//              password,
//              role: UserRoles.VENDOR
//         });

//         await newVendor.save();
//         return newVendor.toObject();
//     } catch (error) {
//         console.error('Error creating vendor:', error);
//         return null;
//     }
// }


// export const updateVendor = async (email: string, vendorData: UserInput): Promise<IUser | null> => {
//     const vendor = await User.findById(email);
//     if (!vendor || vendor.role !== UserRoles.VENDOR) {
//         throw new Error('Vendor not found');
//     }
//     const newPassword = vendorData.password 
//     ? await bcrypt.hash(vendorData.password, 10) 
//     : vendor.password;
//     const updatedVendor = await User.findByIdAndUpdate(email, { ...vendorData, password: newPassword }, { new: true });
//     return updatedVendor;
// }

import bcrypt from "bcryptjs";
import User from "@/api/models/user/user";
import { UserInput } from "./types";
import { IUser } from "@/api/models/user/type";
import { UserRoles } from "@/api/models/user/enum";
import { FtpInput } from "@/services/ftp/types";
import { IFtp } from "@/api/models/ftp/types";
import { Types } from "mongoose";

export interface VendorResponse {
  _id: string; // Changed from Types.ObjectId to string
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  contactNumber: string;
  password: string;
  email: string;
  role: string;
  ftps: FtpInput[];
}

export const getAllVendor = async (): Promise<VendorResponse[]> => {
  const query = { role: UserRoles.VENDOR };
  const users = await User.find(query).populate("ftps").lean();

  return users.map((user) => ({
    ...user,
    _id: user._id.toString(), // Convert ObjectId to string
    ftps:
      user.ftps?.map((ftp: IFtp) => ({
        host: ftp.host,
        ftpUser: ftp.ftpUser,
        password: "", // Mask FTP passwords
        path: ftp.path,
        isSecure: ftp.isSecure || false,
        user: ftp.user.toString(), // Convert ObjectId to string
        createdBy: ftp.createdBy,
      })) || [],
  }));
};

export const addVendor = async (
  firstName: string,
  lastName: string,
  companyName: string,
  contactNumber: string,
  companyAddress: string,
  email: string,
  status: string,
  vendorPassword: string
): Promise<IUser | null> => {
  try {
    const hashedPassword = await bcrypt.hash(vendorPassword, 10);
    const newVendor = new User({
      firstName,
      lastName,
      companyName,
      companyAddress,
      contactNumber,
      email,
      status,
      password: hashedPassword,
      role: UserRoles.VENDOR,
    });

    await newVendor.save();
    return newVendor.toObject();
  } catch (error) {
    console.error("Error creating vendor:", error);
    return null;
  }
};

export const updateVendor = async (
  email: string,
  vendorData: UserInput
): Promise<IUser | null> => {
  const vendor = await User.findOne({ email });
  if (!vendor || vendor.role !== UserRoles.VENDOR) {
    throw new Error("Vendor not found");
  }

  const newPassword = vendorData.password
    ? await bcrypt.hash(vendorData.password, 10)
    : vendor.password;

  const updatedVendor = await User.findOneAndUpdate(
    { email },
    { ...vendorData, password: newPassword },
    { new: true }
  );
  return updatedVendor;
};

// export const disableVendor = async (id: string, vendorData: UserInput): Promise<IUser | null> => {
//     const vendor = await User.findById(id);
//     if (!vendor || vendor.role !== UserRoles.VENDOR) {
//         throw new Error('Vendor not found');
//     }
//     const newPassword = await bcrypt.hash(vendorData.password, 10);
//     const disabledVendor = await User.findByIdAndUpdate(id, { ...vendorData, password: newPassword }, { new: true });
//     return disabledVendor;
// }

// export const DeleteVendor = async (email: string) => {   
//     const vendor = await del(`${routes.dashboard.vendor.deleteVendor}/${email}`);
//     if (vendor.status) {
//         return { vendor: vendor.data, error: null };
//     }
//     return { vendor: null, error: vendor.message as string };
// };
// export const DeleteVendor = async ( email: string) => {   
//     const vendor = await User.findById(email);
//     if (!vendor || vendor.role !== UserRoles.VENDOR) {
//                     throw new Error('Vendor not found or invalid role');
//                 }
        
//                 const deletedVendor = await User.findByIdAndDelete();
//             return { Error};
// };
export const DeleteVendor = async (email: string) => {   
    try {
        const vendor = await User.findOne({ email });
        if (!vendor || vendor.role !== UserRoles.VENDOR) {
            throw new Error("Vendor not found or invalid role");
        }

        await User.findByIdAndDelete(vendor._id); // Delete using the vendor's _id

        return { success: true, message: "Vendor deleted successfully" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


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

