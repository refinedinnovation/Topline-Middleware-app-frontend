import { UserRoles } from "@/api/models/user/enum";


export interface Login {
    email: string;
    password: string;
}

export interface JWTEncryptedData {
    _id:string;
    // userName: string;
    email: string;
    firstName: string;
    lastName:string;
    companyName:string;
    companyAddress:string;
    contactNumber:string;
    role:UserRoles;
    // ftps:[];
} 