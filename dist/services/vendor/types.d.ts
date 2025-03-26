import { UserRoles } from "@/api/models/user/enum";
import { FtpInput } from "@/services/ftp/types";
export interface UserInput {
    _id: string;
    firstName: string;
    lastName: string;
    companyName: string;
    companyAddress: string;
    contactNumber: string;
    password: string;
    email: string;
    role: UserRoles.VENDOR;
    ftps: FtpInput[];
}
