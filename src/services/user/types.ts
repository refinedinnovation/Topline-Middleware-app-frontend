import { UserRoles } from "@/api/models/user/enum";
import { FtpInput } from "@/services/ftp/types";

export interface UserInput {
    // userName: string;
    _id:string;
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
    companyAddress: string;
    contactNumber: string;
    status: string;
    password: string;
    ftps: FtpInput[]; 
    role: UserRoles;
}
