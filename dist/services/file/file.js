"use strict";
// import { IError } from "@/utils/CustomError";
// import { findFtpById } from "../ftp/ftp";
// import { closeFtpConnection, connectFtp, downloadFile } from "../connector/ftpConnector";
// import path from 'path';
// import os from 'os';
// import cronService from "../cronService/cronService";
// import { ICron } from "@/api/models/cronJobs/types";
// import { CronStatus } from "@/api/models/cronJobs/enums";
// import Client from 'ftp';
// import fs from 'fs';
// // import path from 'path';
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndConvertFile = exports.downloadFileFromFtp = void 0;
const tslib_1 = require("tslib");
const XLSX = tslib_1.__importStar(require("xlsx"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const ftp_1 = tslib_1.__importDefault(require("ftp"));
const conversion_1 = require("@/services/fileConversion/conversion");
const enums_1 = require("@/api/models/convertedFiles/enums");
const enums_2 = require("@/api/models/cronJobs/enums");
const cronService_1 = tslib_1.__importDefault(require("../cronService/cronService"));
const ftp_2 = require("../ftp/ftp");
// Function to download files from FTP and convert them automatically
const downloadFileFromFtp = async (cronJob) => {
    try {
        if (!cronJob || !cronJob.ftp) {
            throw new Error("❌ Invalid cron job: No FTP details found.");
        }
        const ftpConfig = await (0, ftp_2.findFtpById)(cronJob.ftp.toString());
        if (!ftpConfig) {
            throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
        }
        console.log(`📥 Downloading files from FTP for ID: ${cronJob.ftp}`);
        console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);
        const ftpClient = new ftp_1.default();
        ftpClient.on("ready", async () => {
            console.log(`✅ FTP connection established.`);
            const ftpPaths = Array.isArray(ftpConfig.path) ? ftpConfig.path : [ftpConfig.path];
            console.log(`🔍 FTP Paths to Process:`, ftpPaths);
            if (!ftpPaths.length) {
                console.error("❌ No FTP paths specified.");
                ftpClient.end();
                return;
            }
            const localDir = path_1.default.join(__dirname, "../downloads");
            if (!fs_1.default.existsSync(localDir)) {
                fs_1.default.mkdirSync(localDir, { recursive: true });
            }
            for (const remoteDir of ftpPaths) {
                console.log(`📂 Processing FTP directory: ${remoteDir}`);
                try {
                    await downloadXlsxFiles(ftpClient, remoteDir, localDir);
                    console.log(`✅ All .xlsx files downloaded successfully from ${remoteDir}`);
                }
                catch (error) {
                    console.error(`❌ Error downloading .xlsx files from ${remoteDir}:`, error);
                }
            }
            ftpClient.end();
            await cronService_1.default.updateCronStatus(cronJob.id, enums_2.CronStatus.COMPLETED, new Date());
        });
        ftpClient.connect({
            host: ftpConfig.host,
            user: ftpConfig.ftpUser,
            password: ftpConfig.password,
        });
    }
    catch (error) {
        console.error("❌ FTP operation failed:", error);
    }
};
exports.downloadFileFromFtp = downloadFileFromFtp;
// Headers for file processing
const headers = [
    "Handle", "Command", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags",
    "Published", "Option1 Name", "Option1 Value", "Option1 Linked To",
    "Option2 Name", "Option2 Value", "Option2 Linked To", "Option3 Name", "Option3 Value",
    "Option3 Linked To", "Variant SKU", "Variant Grams", "Variant Inventory Tracker",
    "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
    "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
    "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
    "SEO Title", "SEO Description", "Google Shopping / Google Product Category",
    "Google Shopping / Gender", "Google Shopping / Age Group", "Google Shopping / MPN",
    "Google Shopping / Condition", "Google Shopping / Custom Product",
    "Google Shopping / Custom Label 0", "Google Shopping / Custom Label 1",
    "Google Shopping / Custom Label 2", "Google Shopping / Custom Label 3",
    "Google Shopping / Custom Label 4"
];
// Function to download and convert file
const downloadAndConvertFile = async (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = `./src/downloadedFiles/${fileName}`;
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).send("File not found");
        }
        // Read the downloaded file
        const sourceWorkbook = XLSX.readFile(filePath, { type: "file", raw: true });
        const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
        const sourceData = XLSX.utils.sheet_to_json(sourceWorksheet);
        // Format data
        const formattedData = sourceData.map(row => {
            const formattedRow = {};
            headers.forEach(header => {
                formattedRow[header] = row[header] || "";
            });
            return formattedRow;
        });
        // Convert and save new file
        const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const convertedFileName = `converted_${fileName}`;
        const convertedFilePath = `./src/convertedFiles/${convertedFileName}`;
        const outputBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
        fs_1.default.writeFileSync(convertedFilePath, outputBuffer);
        // Save conversion record
        const conversionData = {
            conversionType: enums_1.CONVERSION_TYPE.SCHEDULE,
            filePath: convertedFileName,
            createdBy: req?.user?._id,
        };
        await (0, conversion_1.SaveConversion)(conversionData);
        // Send the converted file as a response
        res.setHeader("Content-Disposition", `attachment; filename=${convertedFileName}`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return res.send(outputBuffer);
    }
    catch (error) {
        console.error("Error in downloadAndConvertFile:", error);
        return res.status(500).send("Internal Server Error");
    }
};
exports.downloadAndConvertFile = downloadAndConvertFile;
// Function to download only .xlsx files
async function downloadXlsxFiles(ftpClient, remotePath, localPath) {
    return new Promise((resolve, reject) => {
        ftpClient.list(remotePath, async (err, files) => {
            if (err)
                return reject(err);
            const xlsxFiles = files.filter(file => file.name.trim().toLowerCase().endsWith(".xlsx"));
            if (xlsxFiles.length === 0) {
                console.log("⚠️ No .xlsx files found to download.");
                return resolve();
            }
            for (const file of xlsxFiles) {
                const remoteFilePath = `${remotePath}/${file.name}`;
                const localFilePath = path_1.default.join(localPath, file.name);
                try {
                    await downloadSingleFile(ftpClient, remoteFilePath, localFilePath);
                    console.log(`✅ Downloaded: ${file.name}`);
                }
                catch (error) {
                    console.error(`❌ Error downloading ${file.name}:`, error);
                }
            }
            resolve();
        });
    });
}
// Function to download a single file
async function downloadSingleFile(ftpClient, remoteFilePath, localFilePath) {
    return new Promise((resolve, reject) => {
        ftpClient.get(remoteFilePath, (err, stream) => {
            if (err)
                return reject(err);
            stream.once("close", () => resolve());
            stream.pipe(fs_1.default.createWriteStream(localFilePath));
        });
    });
}
//# sourceMappingURL=file.js.map