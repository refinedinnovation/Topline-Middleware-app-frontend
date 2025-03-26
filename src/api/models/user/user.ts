// import { Schema, model, Document } from 'mongoose';
// import { IUser } from './type';
// import { UserRoles } from './enum';


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
 
// import { Schema, model, Document } from 'mongoose';
// import { IUse } from './type';
// import { UserRoles } from './enum';
// import { v4 as uuidv4 } from 'uuid';
// import { ObjectId } from 'mongodb';

// // Define the user schema
// const userSchema = new Schema<IUse>(
//   {
//     // _id:{ type: String, required: false, trim: true },
//     _id: { 
//       type: ObjectId, 
//       // required: true, 
//       trim: true, 
//       default: () => uuidv4(), // Generate if not provided
//     },
//     firstName: { type: String, required: true, trim: true },
//     lastName: { type: String, required: true, trim: true },
//     email: {
//       type: String,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address'],
//     },
//     companyName: { type: String, required: true, trim: true },
//     companyAddress: { type: String, required: true, trim: true },
//     contactNumber: { type: String, required: true, trim: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       default: UserRoles.VENDOR,
//       enum: Object.values(UserRoles),
//     },
//   },
//   { timestamps: true }
// );

// // Define a virtual field for `ftps`
// userSchema.virtual('ftps', {
//   ref: 'Ftp',
//   localField: 'id',
//   foreignField: 'user',
// });

// // Ensure virtual fields are included in JSON and object outputs
// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });

// // Create and export the User model
// const User = model<IUse>('User', userSchema);

// export default User;
import { model, Document, Schema, Types } from "mongoose";
import { IUse } from "./type";
import { UserRoles } from "./enum";

// Define the user schema
const userSchema = new Schema<IUse>(
  {
    _id: { 
      type: Schema.Types.ObjectId,  // Corrected: Using Schema.Types.ObjectId
      default: () => new Types.ObjectId(), // Correctly generates a MongoDB ObjectId
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true, // Add this to ensure email is always required
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address'],
    },    
    companyName: { type: String, required: true, trim: true },
    companyAddress: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: UserRoles.VENDOR,
      enum: Object.values(UserRoles),
    },
  },
  { timestamps: true }
);

// Define a virtual field for `ftps`
userSchema.virtual("ftps", {
  ref: "Ftp",
  localField: "_id", // Corrected from 'id' to '_id'
  foreignField: "user",
});

// Ensure virtual fields are included in JSON and object outputs
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

// Create and export the User model
const User = model<IUse>("User", userSchema);

export default User;
