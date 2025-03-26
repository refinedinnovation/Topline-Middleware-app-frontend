import { Document, Types } from 'mongoose';
import { UserRoles } from './enum';
import { IFtp } from '../ftp/types';
export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
    contactNumber: string;
    password: string;
    role: UserRoles;
    ftps: IFtp[];
}
export interface IUse extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
    contactNumber: string;
    password: string;
    role: UserRoles;
    ftps: IFtp[];
}
