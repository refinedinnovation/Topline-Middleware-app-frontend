// import { Document } from "mongoose";
// import { UserRoles } from "./enum";

// export interface IUser extends Document {
//     _id: string;
//     firstName:string;
//     lastName: string;
//     companyName:string;
//     companyAddress:string;
//     contactNumber:string;
//     email: string;
//     password: string;
//     userName: string;
//     role:UserRoles;
//     ftps: string[];  
//     createdAt: Date; 
//     updatedAt: Date;
//   } 
// import { Document } from 'mongoose';
// import { UserRoles } from './enum';
// import { IFtp } from '../ftp/types';
// import { Schema, Types } from 'mongoose';



// export interface IUser extends Document {
//   _id: Types.ObjectId;
//   firstName: string;
//   lastName: string;
//   email: string;
//   companyName: string;
//   companyAddress: string;
//   contactNumber: string;
//   password: string; 
//   role: UserRoles;
//   ftps: IFtp[];
// }
// export interface IUse extends Document {
//   _id: Types.ObjectId;
//   firstName: string;
//   lastName: string;
//   email: string;
//   companyName: string;
//   companyAddress: string;
//   contactNumber: string;
//   password: string; 
//   role: UserRoles;
//   ftps: IFtp[];
// }

import { Document, Schema, Types } from 'mongoose'; // Import Types properly
import { UserRoles } from './enum';
import { IFtp } from '../ftp/types';

export interface IUser extends Document {
  _id: Types.ObjectId;  // Use Types.ObjectId instead of ObjectId
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
  _id: Types.ObjectId;  // Use Types.ObjectId instead of ObjectId
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


