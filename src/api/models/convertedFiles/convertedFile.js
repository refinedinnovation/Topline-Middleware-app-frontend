"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("./enums");
const mongodb_1 = require("mongodb");
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
const ConvertedFileSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongodb_1.ObjectId(), // Auto-generate ObjectId
    },
    filePath: { type: String, required: false },
    conversionType: {
        type: String,
        enum: Object.values(enums_1.CONVERSION_TYPE),
        default: enums_1.CONVERSION_TYPE.MANUAL,
    },
    vendor: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: false },
    firstName: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    }
    // companyName: { type: String, ref: "User" },
    // userName: { type: String, required: true },
}, { timestamps: true });
const ConvertedFile = (0, mongoose_1.model)('ConvertedFile', ConvertedFileSchema);
exports.default = ConvertedFile;
