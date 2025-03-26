"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConversions = exports.DownloadConvertedFile = exports.SaveConversion = void 0;
const tslib_1 = require("tslib");
const convertedFile_1 = tslib_1.__importDefault(require("@/api/models/convertedFiles/convertedFile"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const SaveConversion = async (data) => {
    const convertedFile = await convertedFile_1.default.create(data);
    return convertedFile;
};
exports.SaveConversion = SaveConversion;
// export const GetConversions = async () => {
//     const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
//     return conversions;
// };
// export const GetConversions = async (): Promise<ConvertedFileType[]> => {
//     const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
//     return conversions;
// };
const DownloadConvertedFile = (fileName) => {
    const filePath = `./src/convertedFiles/${fileName}`;
    const file = fs_1.default.readFileSync(filePath);
    return file;
};
exports.DownloadConvertedFile = DownloadConvertedFile;
// import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";
// import ConvertedFile from "@/api/models/convertedFiles/convertedFile";
// import { FileConversionInout } from "./types";
// import fs from 'fs';
// export const SaveConversion = async (data: FileConversionInout) => {
//     const convertedFile = await ConvertedFile.create(data);
//     return convertedFile;
// };
// // Adjusting the return type and using 'unknown' for type assertion
const GetConversions = async () => {
    const conversions = await convertedFile_1.default.find().populate('vendor').populate('createdBy').lean();
    // Use 'unknown' first, and then cast to 'CONVERSION_TYPE[]' for type safety
    return conversions; // Double casting, be cautious
};
exports.GetConversions = GetConversions;
// export const DownloadConvertedFile = (fileName: string) => {
//     const filePath = `./src/convertedFiles/${fileName}`;
//     const file = fs.readFileSync(filePath);
//     return file;
// };
// import ConvertedFile from "@/api/models/convertedFiles/convertedFile"; // Assuming your model is correctly imported
// import { FileConversionInout } from "./types";  // Your input type for SaveConversion
// import fs from 'fs';
// // SaveConversion function remains unchanged
// export const SaveConversion = async (data: FileConversionInout): Promise<ConvertedFileType> => {
//     const convertedFile = await ConvertedFile.create(data);
//     return convertedFile;
// };
// // Add the type annotation for GetConversions
// export const GetConversions = async (): Promise<ConvertedFileType[]> => {
//     const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
//     return conversions;
// };
// // DownloadConvertedFile function remains unchanged
// export const DownloadConvertedFile = (fileName: string) => {
//     const filePath = `./src/convertedFiles/${fileName}`;
//     const file = fs.readFileSync(filePath);
//     return file;
// };
//# sourceMappingURL=conversion.js.map