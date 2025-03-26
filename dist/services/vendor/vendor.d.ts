import { UserInput } from "./types";
import { IUser } from "@/api/models/user/type";
import { FtpInput } from "@/services/ftp/types";
export interface VendorResponse {
    _id: string;
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
export declare const getAllVendor: () => Promise<VendorResponse[]>;
export declare const addVendor: (firstName: string, lastName: string, companyName: string, contactNumber: string, companyAddress: string, email: string, status: string, vendorPassword: string) => Promise<IUser | null>;
export declare const updateVendor: (email: string, vendorData: UserInput) => Promise<IUser | null>;
export declare const DeleteVendor: (email: string) => Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    message?: undefined;
}>;
