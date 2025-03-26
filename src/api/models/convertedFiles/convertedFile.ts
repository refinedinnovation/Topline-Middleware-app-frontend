import { Schema, model } from 'mongoose';
import { CONVERSION_TYPE } from './enums';
import { IConvertedFile } from './types';
import { ObjectId } from 'mongodb';


// const ConvertedFileSchema = new Schema<IConvertedFile>({
//     filePath: {
//         type: String,
//         required: true,
//     },
//     _id: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     conversionType: {
//         type: String,
//         enum: Object.values(CONVERSION_TYPE),
//         default: CONVERSION_TYPE.MANUAL,
//     },
//     vendor: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     createdBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       firstName:{
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       }
// }, {
//     timestamps: true
// });


const ConvertedFileSchema = new Schema<IConvertedFile>({
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new ObjectId(), // Auto-generate ObjectId
    },
    filePath: { type: String, required: false },
    conversionType: {
      type: String,
      enum: Object.values(CONVERSION_TYPE),
      default: CONVERSION_TYPE.MANUAL,
    },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    firstName:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: false,
              }
    // companyName: { type: String, ref: "User" },
    // userName: { type: String, required: true },
  }, { timestamps: true });
  

const ConvertedFile = model<IConvertedFile>('ConvertedFile', ConvertedFileSchema);

export default ConvertedFile;
 