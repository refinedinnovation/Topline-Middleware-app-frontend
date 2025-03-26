"use strict";
// import { Schema, model, Document } from 'mongoose';
// import { IUser } from './type';
// import { UserRoles } from './enum';
Object.defineProperty(exports, "__esModule", { value: true });
// // const userSchema = new Schema<IUser>({
// //   userName: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     trim: true,
// //     lowercase: true
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //   },
// //   fullName: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   role: {
// //     type: String,
// //     required: true,
// //     default: UserRoles.VENDOR,
// //     enum: UserRoles
// //   }
// // }, {
// //   timestamps: true 
// // });
// const userSchema = new Schema<IUser>({
//   firstName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   // userName:{
//   //   type: String,
//   //   trim: true
//   // },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   companyName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   companyAddress: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   contactNumber: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true,
//     default: UserRoles.VENDOR,
//     enum: UserRoles
//   }
// }, {
//   timestamps: true
// });
// // Creating a relation between user and task table
// userSchema.virtual('ftps', {
//   ref: 'Ftp',
//   localField: '_id',
//   foreignField: 'user'
// });
// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });
// const User = model<IUser>('User', userSchema);
// export default User;
const mongoose_1 = require("mongoose");
const enum_1 = require("./enum");
const uuid_1 = require("uuid");
// Define the user schema
const userSchema = new mongoose_1.Schema({
    // _id:{ type: String, required: false, trim: true },
    _id: {
        type: String,
        required: true,
        trim: true,
        default: () => (0, uuid_1.v4)(), // Generate if not provided
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address'],
    },
    companyName: { type: String, required: true, trim: true },
    companyAddress: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: enum_1.UserRoles.VENDOR,
        enum: Object.values(enum_1.UserRoles),
    },
}, { timestamps: true });
// Define a virtual field for `ftps`
userSchema.virtual('ftps', {
    ref: 'Ftp',
    localField: '_id',
    foreignField: 'user',
});
// Ensure virtual fields are included in JSON and object outputs
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });
// Create and export the User model
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
