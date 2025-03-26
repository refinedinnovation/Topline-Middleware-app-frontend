import { Types } from "mongoose";
import { FTP_STATUS } from "./enums";
export interface IFtp {
    host: string;
    ftpUser: string;
    password: string;
    status: FTP_STATUS;
    path: string;
    user: Types.ObjectId;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    isSecure?: boolean;
}
