"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndConvertFile = exports.downloadConvertedFile = exports.getAllConvertedFiles = exports.uploadAndConvertFile = void 0;
const XLSX = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const conversion_1 = require("@/services/fileConversion/conversion");
const enums_1 = require("@/api/models/convertedFiles/enums");
const shared_1 = require("@/shared");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const headers = [
    "Handle", "Command", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags", "Published",
    "Option1 Name", "Option1 Value", "Option1 Linked To", "Option2 Name", "Option2 Value", "Option2 Linked To",
    "Option3 Name", "Option3 Value", "Option3 Linked To", "Variant SKU", "Variant Grams", "Variant Inventory Tracker",
    "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price",
    "Variant Requires Shipping", "Variant Taxable", "Variant Barcode", "Image Src", "Image Position", "Image Alt Text",
    "Gift Card", "SEO Title", "SEO Description", "Google Shopping / Google Product Category", "Google Shopping / Gender",
    "Google Shopping / Age Group", "Google Shopping / MPN", "Google Shopping / Condition", "Google Shopping / Custom Product",
    "Google Shopping / Custom Label 0", "Google Shopping / Custom Label 1", "Google Shopping / Custom Label 2",
    "Google Shopping / Custom Label 3", "Google Shopping / Custom Label 4", "Battery Power (Ah) (product.metafields.custom.battery_power_ah_)",
    "calculator (product.metafields.custom.calculator)", "Category ID (product.metafields.custom.category_id)",
    "Colour (product.metafields.custom.colour)", "Corded/Cordless (product.metafields.custom.corded_cordless)",
    "Corded/Cordless (product.metafields.custom.corded_cordless_new)", "Item_small_description (product.metafields.custom.item_small_description)",
    "Length (product.metafields.custom.length)", "Max Pressure (bar)  (product.metafields.custom.max_pressure_bar_)",
    "Max Pressure (bar)  (product.metafields.custom.max_pressure_bar_new)", "Operating Pressure (bar) (product.metafields.custom.operating_pressure_bar_)",
    "Operating Pressure (bar) (product.metafields.custom.operating_pressure_bar_new)", "Power Supply  (product.metafields.custom.power_supply_)",
    "Power Supply  (product.metafields.custom.power_supply_new)", "Product Code (product.metafields.custom.product_code)",
    "Product Feature 1 (product.metafields.custom.product_feature_1)", "Product Feature 2 (product.metafields.custom.product_feature_2)",
    "product Feature 3 (product.metafields.custom.product_feature_3)", "Returns (product.metafields.custom.returns)",
    "Root Category (product.metafields.custom.root_category)", "Safety_Sheet_SRC (product.metafields.custom.safety_sheet_src)",
    "Selling Point 1 (product.metafields.custom.selling_point_1)", "Selling Point 2 (product.metafields.custom.selling_point_2)",
    "Selling Point 3 (product.metafields.custom.selling_point_3)", "Sub_Category_1 (product.metafields.custom.sub_category_1)",
    "Sub_Category_2 (product.metafields.custom.sub_category_2)", "Sub_Category_3 (product.metafields.custom.sub_category_3)",
    "Supplier_Code (product.metafields.custom.supplier_code)", "Supplier Reference (product.metafields.custom.supplier_reference)",
    "Thickness (product.metafields.custom.thickness)", "Topline_Code (product.metafields.custom.topline_code)",
    "Topline Item Brand (product.metafields.custom.topline_item_brand)", "Nested Product Attributes (product.metafields.filters.nested_product_attributes)",
    "Topline_Supplier_Name (product.metafields.custom.topline_supplier_name)", "Type (product.metafields.custom.type)",
    "Watts (product.metafields.custom.watts)", "Complementary products (product.metafields.shopify--discovery--product_recommendation.complementary_products)",
    "Related products (product.metafields.shopify--discovery--product_recommendation.related_products)",
    "Related products settings (product.metafields.shopify--discovery--product_recommendation.related_products_display)",
    "Variant Image", "Variant Weight Unit", "Variant Tax Code", "Cost per item", "Included / Ireland", "Price / Ireland",
    "Compare At Price / Ireland", "Included / International", "Price / International", "Compare At Price / International", "Status"
];
const uploadAndConvertFile = (req, res) => {
    var _a;
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded');
    }
    const sourceWorkbook = XLSX.readFile(file.path, { type: 'file', raw: true });
    const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
    const sourceData = XLSX.utils.sheet_to_json(sourceWorksheet);
    const formattedData = sourceData === null || sourceData === void 0 ? void 0 : sourceData.map(row => {
        const formattedRow = {};
        headers.forEach(header => {
            formattedRow[header] = row[header] || '';
        });
        return formattedRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    fs_1.default.unlinkSync(file.path);
    res.setHeader('Content-Disposition', 'attachment; filename=converted_file.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // Generate a new file with buffer data and save it to root folder / convertedFiles with a unique name
    const fileName = `converted_file_${Date.now()}.xlsx`;
    fs_1.default.writeFileSync(`./src/convertedFiles/${fileName}`, outputBuffer);
    const conversionData = {
        conversionType: enums_1.CONVERSION_TYPE.MANUAL,
        filePath: fileName,
        createdBy: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
    };
    (0, conversion_1.SaveConversion)(conversionData).then(x => {
        console.log('Conversion saved...', x === null || x === void 0 ? void 0 : x._id);
    }).catch(err => {
        console.error('Error saving conversion...', err);
    });
    // console.log('Sending response...', outputBuffer);
    return res.send(outputBuffer);
};
exports.uploadAndConvertFile = uploadAndConvertFile;
// const ConvertedFileSchema = new Schema<IConvertedFile>({
//   _id: {
//     type: Schema.Types.ObjectId,
//     default: () => new ObjectId(), // Auto-generate ObjectId
//   },
//   filePath: { type: String, required: true },
//   conversionType: {
//     type: String,
//     enum: Object.values(CONVERSION_TYPE),
//     default: CONVERSION_TYPE.MANUAL,
//   },
//   vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   // companyName: { type: String, required: true },
//   // userName: { type: String, required: true },
// }, { timestamps: true });
const ConvertedFileSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongodb_1.ObjectId(), // Auto-generate ObjectId
    },
    filePath: { type: String, required: true },
    conversionType: {
        type: String,
        enum: Object.values(enums_1.CONVERSION_TYPE),
        default: enums_1.CONVERSION_TYPE.MANUAL,
    },
    vendor: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    // companyName: { type: String, required: true },
    // userName: { type: String, required: true },
}, { timestamps: true });
const getAllConvertedFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const convertedFiles = yield (0, conversion_1.GetConversions)();
    console.log('Converted Files:', convertedFiles);
    return (0, shared_1.ApiResponse)(true, "Files Converted Successfully", convertedFiles, 201, res);
});
exports.getAllConvertedFiles = getAllConvertedFiles;
const downloadConvertedFile = (req, res) => {
    const { fileName } = req.params;
    const filePath = `./src/convertedFiles/${fileName}`;
    const file = fs_1.default.readFileSync(filePath);
    if (!file) {
        return res.status(404).send('File not found');
    }
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.send(file);
};
exports.downloadConvertedFile = downloadConvertedFile;
const downloadAndConvertFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { fileName } = req.params;
        const filePath = `./src/downloadedFiles/${fileName}`;
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }
        // Read the downloaded file
        const sourceWorkbook = XLSX.readFile(filePath, { type: 'file', raw: true });
        const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
        const sourceData = XLSX.utils.sheet_to_json(sourceWorksheet);
        // Format data
        const formattedData = sourceData.map(row => {
            const formattedRow = {};
            headers.forEach(header => {
                formattedRow[header] = row[header] || '';
            });
            return formattedRow;
        });
        // Convert and save new file
        const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const convertedFileName = `converted_${fileName}`;
        const convertedFilePath = `./src/convertedFiles/${convertedFileName}`;
        const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        fs_1.default.writeFileSync(convertedFilePath, outputBuffer);
        // Save conversion record
        const conversionData = {
            conversionType: enums_1.CONVERSION_TYPE.SCHEDULE, // Change type
            filePath: convertedFileName,
            createdBy: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        };
        yield (0, conversion_1.SaveConversion)(conversionData);
        // Send the converted file as a response
        res.setHeader('Content-Disposition', `attachment; filename=${convertedFileName}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(outputBuffer);
    }
    catch (error) {
        console.error('Error in downloadAndConvertFile:', error);
        return res.status(500).send('Internal Server Error');
    }
});
exports.downloadAndConvertFile = downloadAndConvertFile;
// import { Request, Response } from 'express';
// import * as XLSX from 'xlsx';
// import fs from 'fs';
// import { InputData } from './types';
// import { GetConversions, SaveConversion } from '@/services/fileConversion/conversion';
// import { CONVERSION_TYPE } from '@/api/models/convertedFiles/enums';
// import { AuthenticatedRequest } from '@/middlewares/types';
// import { FileConversionInout } from '@/services/fileConversion/types';
// import { ApiResponse } from '@/shared';
// import path from 'path';
// const headers: (keyof InputData)[] = [
//   "Handle", "Command", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags", "Published", 
//   "Option1 Name", "Option1 Value", "Option1 Linked To", "Option2 Name", "Option2 Value", "Option2 Linked To", 
//   "Option3 Name", "Option3 Value", "Option3 Linked To", "Variant SKU", "Variant Grams", "Variant Inventory Tracker", 
//   "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price", 
//   "Variant Requires Shipping", "Variant Taxable", "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", 
//   "Gift Card", "SEO Title", "SEO Description", "Google Shopping / Google Product Category", "Google Shopping / Gender", 
//   "Google Shopping / Age Group", "Google Shopping / MPN", "Google Shopping / Condition", "Google Shopping / Custom Product", 
//   "Google Shopping / Custom Label 0", "Google Shopping / Custom Label 1", "Google Shopping / Custom Label 2", 
//   "Google Shopping / Custom Label 3", "Google Shopping / Custom Label 4", "Battery Power (Ah) (product.metafields.custom.battery_power_ah_)", 
//   "calculator (product.metafields.custom.calculator)", "Category ID (product.metafields.custom.category_id)", 
//   "Colour (product.metafields.custom.colour)", "Corded/Cordless (product.metafields.custom.corded_cordless)", 
//   "Corded/Cordless (product.metafields.custom.corded_cordless_new)", "Item_small_description (product.metafields.custom.item_small_description)", 
//   "Length (product.metafields.custom.length)", "Max Pressure (bar)  (product.metafields.custom.max_pressure_bar_)", 
//   "Max Pressure (bar)  (product.metafields.custom.max_pressure_bar_new)", "Operating Pressure (bar) (product.metafields.custom.operating_pressure_bar_)", 
//   "Operating Pressure (bar) (product.metafields.custom.operating_pressure_bar_new)", "Power Supply  (product.metafields.custom.power_supply_)", 
//   "Power Supply  (product.metafields.custom.power_supply_new)", "Product Code (product.metafields.custom.product_code)", 
//   "Product Feature 1 (product.metafields.custom.product_feature_1)", "Product Feature 2 (product.metafields.custom.product_feature_2)", 
//   "product Feature 3 (product.metafields.custom.product_feature_3)", "Returns (product.metafields.custom.returns)", 
//   "Root Category (product.metafields.custom.root_category)", "Safety_Sheet_SRC (product.metafields.custom.safety_sheet_src)", 
//   "Selling Point 1 (product.metafields.custom.selling_point_1)", "Selling Point 2 (product.metafields.custom.selling_point_2)", 
//   "Selling Point 3 (product.metafields.custom.selling_point_3)", "Sub_Category_1 (product.metafields.custom.sub_category_1)", 
//   "Sub_Category_2 (product.metafields.custom.sub_category_2)", "Sub_Category_3 (product.metafields.custom.sub_category_3)", 
//   "Supplier_Code (product.metafields.custom.supplier_code)", "Supplier Reference (product.metafields.custom.supplier_reference)", 
//   "Thickness (product.metafields.custom.thickness)", "Topline_Code (product.metafields.custom.topline_code)", 
//   "Topline Item Brand (product.metafields.custom.topline_item_brand)", "Nested Product Attributes (product.metafields.filters.nested_product_attributes)", 
//   "Topline_Supplier_Name (product.metafields.custom.topline_supplier_name)", "Type (product.metafields.custom.type)", 
//   "Watts (product.metafields.custom.watts)", "Complementary products (product.metafields.shopify--discovery--product_recommendation.complementary_products)", 
//   "Related products (product.metafields.shopify--discovery--product_recommendation.related_products)", 
//   "Related products settings (product.metafields.shopify--discovery--product_recommendation.related_products_display)", 
//   "Variant Image", "Variant Weight Unit", "Variant Tax Code", "Cost per item", "Included / Ireland", "Price / Ireland", 
//   "Compare At Price / Ireland", "Included / International", "Price / International", "Compare At Price / International", "Status"
// ];
// // export const uploadAndConvertFile = (req: AuthenticatedRequest, res: Response) => {
// //   const file = req.file;
// //   if (!file) {
// //     return res.status(400).send('No file uploaded');
// //   }
// //   const sourceWorkbook = XLSX.readFile(file.path, { type: 'file', raw: true });
// //   const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
// //   const sourceData: any[] = XLSX.utils.sheet_to_json(sourceWorksheet);
// //   const formattedData = sourceData?.map(row => {
// //     const formattedRow: Partial<InputData> = {};
// //     headers.forEach(header => {
// //       formattedRow[header] = row[header] || '';
// //     });
// //     return formattedRow;
// //   });
// //   const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers as string[] });
// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
// //   const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
// //   fs.unlinkSync(file.path);
// //   res.setHeader('Content-Disposition', 'attachment; filename=converted_file.xlsx');
// //   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
// //   const fileName = `converted_file_${Date.now()}.xlsx`;
// //   fs.writeFileSync(`./src/convertedFiles/${fileName}`, outputBuffer);
// //   const conversionData = {
// //     conversionType: CONVERSION_TYPE.MANUAL,
// //     filePath: fileName,
// //     createdBy: req?.user?.firstName as string,
// //   } as FileConversionInout;
// //   SaveConversion(conversionData).catch(err => console.error('Error saving conversion...', err));
// //   return res.send(outputBuffer);
// // };
// const convertedFilesDir = path.join(__dirname, '../convertedFiles');
// if (!fs.existsSync(convertedFilesDir)) {
//   fs.mkdirSync(convertedFilesDir, { recursive: true });
// }
// export const uploadAndConvertFile = (req: AuthenticatedRequest, res: Response) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded');
//   }
//   try {
//     // Read the uploaded Excel file
//     const sourceWorkbook = XLSX.readFile(file.path, { type: 'file', raw: true });
//     const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
//     const sourceData: any[] = XLSX.utils.sheet_to_json(sourceWorksheet);
//     // Format data
//     const formattedData = sourceData?.map(row => {
//       const formattedRow: Partial<InputData> = {};
//       headers.forEach(header => {
//         formattedRow[header] = row[header] || '';
//       });
//       return formattedRow;
//     });
//     // Create a new workbook
//     const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers as string[] });
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     // Convert to buffer
//     const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
//     // Delete temp file
//     fs.unlinkSync(file.path);
//     // Generate file name
//     const fileName = `converted_file_${Date.now()}.xlsx`;
//     const filePath = path.join(convertedFilesDir, fileName);
//     // Save the converted file
//     fs.writeFileSync(filePath, outputBuffer);
//     console.log(`File saved successfully at: ${filePath}`);
//     // Save conversion record
//     const conversionData = {
//       conversionType: CONVERSION_TYPE.MANUAL,
//       filePath: fileName,
//       createdBy: req?.user?.firstName as string,
//     } as FileConversionInout;
//     SaveConversion(conversionData).catch(err => console.error('Error saving conversion...', err));
//     // Send response
//     res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     return res.send(outputBuffer);
//   } catch (error) {
//     console.error('Error during file conversion:', error);
//     return res.status(500).send('An error occurred during file conversion.');
//   }
// };
// export const getAllConvertedFiles = async (req: Request, res: Response) => {
//   const convertedFiles = await GetConversions();
//   console.log('Converted Files:', convertedFiles);
//   return ApiResponse(true, "Files Converted Successfully", convertedFiles, 201, res);
// }
// // export const getAllConvertedFilesLogs = async (req: Request, res: Response) => {
// //   const convertedFiles = await GetConversionsLogs();
// //   console.log('Converted Files:', convertedFiles);
// //   return ApiResponse(true, "Files Gets Successfully", convertedFiles, 201, res);
// // }
// export const downloadConvertedFile = (req: Request, res: Response) => {
//   const { fileName } = req.params;
//   const filePath = `./src/convertedFiles/${fileName}`;
//   const file = fs.readFileSync(filePath);
//   if (!file) {
//     return res.status(404).send('File not found');
//   }
//   res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
//   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//   return res.send(file);
// }
