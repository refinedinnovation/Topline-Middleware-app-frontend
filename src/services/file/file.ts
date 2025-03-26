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

// // export const downloadFileFromFtp = async (cronJob: ICron) => {
// //    try {
// //     const remotePath = './ftp-test/products_export_1.csv';
// //     const localPath = path.join(os.homedir(), 'Desktop', path.basename(remotePath));
// //     const ftpConfig = await findFtpById(cronJob?.ftp.toString());
// //     // if (ftpConfig) {
// //     //     await connectFtp(ftpConfig);
// //     // } else {
// //     //     await connectFtp(); 
// //     // }
// //     await connectFtp();
// //     const downloadedFile = await downloadFile(remotePath, localPath);
// //     closeFtpConnection();
// //     await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
// //     return downloadedFile;
// //    } catch (error) {
// //        console.error('FTP operation failed:', error);
// //    }
// // } 

// // export async function downloadFilesFromFtp(cronJob: ICron): Promise<void> {
// //     const ftpClient = new Client();
    
// //     ftpClient.on('ready', async () => {
// //         console.log(`✅ FTP connection established.`);

// //         const remoteDir = '/your-ftp-root-folder/'; // Change to your actual FTP directory
// //         const localDir = path.join(__dirname, '../downloads'); // Adjust the local directory as needed

// //         if (!fs.existsSync(localDir)) {
// //             fs.mkdirSync(localDir, { recursive: true });
// //         }

// //         try {
// //             await downloadAllFiles(ftpClient, remoteDir, localDir);
// //             console.log('✅ All files downloaded successfully.');
// //         } catch (error) {
// //             console.error('❌ Error downloading files:', error);
// //         } finally {
// //             ftpClient.end();
// //         }
// //     });

// //     ftpClient.connect({
// //         host: 'your-ftp-host.com',
// //         user: 'your-ftp-username',
// //         password: 'your-ftp-password',
// //     });
// // }
// import { connectFtp, downloadFile, closeFtpConnection } from './ftpService';
// import { findFtpById } from './ftpConfigService';
// import cronService from './cronService';

// export const downloadFileFromFtp = async (cronJob: ICron) => {
//     try {
//         if (!cronJob || !cronJob.ftp) {
//             throw new Error('❌ Invalid cron job: No FTP details found.');
//         }

//         // Fetch FTP configuration based on cron job's FTP ID
//         const ftpConfig = await findFtpById(cronJob.ftp.toString());
//         if (!ftpConfig) {
//             throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
//         }

//         console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);

//         // Connect to FTP using retrieved credentials
//         await connectFtp(ftpConfig);

//         // Use the FTP path dynamically from cronJob
//         const remotePath = cronJob.schedule; // Ensure this contains a valid FTP path

//         console.log(`📂 Downloading from FTP path: ${remotePath}`);

//         // Download the file (or folder if needed)
//         await downloadFile(remotePath); // Now no local path is needed

//         // Close FTP connection
//         closeFtpConnection();

//         // Mark the cron job as completed
//         await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());

//         console.log('✅ FTP download completed successfully.');
//         return true;
//     } catch (error) {
//         console.error('❌ FTP operation failed:', error);
//         return false;
//     }
// };


// // Helper function to recursively list and download files
// async function downloadAllFiles(ftpClient: Client, remotePath: string, localPath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.list(remotePath, async (err, files) => {
//             if (err) return reject(err);

//             for (const file of files) {
//                 const remoteFilePath = `${remotePath}/${file.name}`;
//                 const localFilePath = path.join(localPath, file.name);

//                 if (file.type === 'd') {
//                     // Create directory locally and recurse into it
//                     if (!fs.existsSync(localFilePath)) {
//                         fs.mkdirSync(localFilePath, { recursive: true });
//                     }
//                     await downloadAllFiles(ftpClient, remoteFilePath, localFilePath);
//                 } else {
//                     // Download file
//                     await downloadFile(ftpClient, remoteFilePath, localFilePath);
//                 }
//             }
//             resolve();
//         });
//     });
// }

// // Helper function to download a single file
// async function downloadFile(ftpClient: Client, remoteFilePath: string, localFilePath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.get(remoteFilePath, (err, stream) => {
//             if (err) return reject(err);

//             stream.once('close', () => resolve());
//             stream.pipe(fs.createWriteStream(localFilePath));
//         });
//     });
// }
// import { IError } from "@/utils/CustomError";
// import { findFtpById } from "../ftp/ftp";
// import { closeFtpConnection, connectFtp } from "../connector/ftpConnector";
// import path from "path";
// import fs from "fs";
// import Client from "ftp";
// import cronService from "../cronService/cronService";
// import { ICron } from "@/api/models/cronJobs/types";
// import { CronStatus } from "@/api/models/cronJobs/enums";

// export const downloadFileFromFtp = async (cronJob: ICron) => {
//     try {
//         if (!cronJob || !cronJob.ftp) {
//             throw new Error("❌ Invalid cron job: No FTP details found.");
//         }

//         // Fetch FTP details dynamically
//         const ftpConfig = await findFtpById(cronJob.ftp.toString());
//         if (!ftpConfig) {
//             throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
//         }

//         console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);

//         // Initialize FTP client
//         const ftpClient = new Client();

//         ftpClient.on("ready", async () => {
//             console.log(`✅ FTP connection established.`);

//             const remoteDir = cronJob.schedule; // Ensure this contains a valid FTP path
//             if (!remoteDir) {
//                 console.error("❌ No FTP path specified in cronJob.schedule");
//                 ftpClient.end();
//                 return;
//             }

//             const localDir = path.join(__dirname, "../downloads"); 
//             if (!fs.existsSync(localDir)) {
//                 fs.mkdirSync(localDir, { recursive: true });
//             }

//             try {
//                 await downloadAllFiles(ftpClient, remoteDir, localDir);
//                 console.log("✅ All files downloaded successfully.");
//             } catch (error) {
//                 console.error("❌ Error downloading files:", error);
//             } finally {
//                 ftpClient.end(); // Close FTP connection
//                 closeFtpConnection();
//             }

//             // Mark cron job as completed
//             await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
//         });

//         ftpClient.connect({
//             host: ftpConfig.host,
//             user: ftpConfig.ftpUser,
//             password: ftpConfig.password,
//         });

//     } catch (error) {
//         console.error("❌ FTP operation failed:", error);
//     }
// };

// export const downloadFileFromFtp = async (cronJob: ICron) => {
//     try {
//         if (!cronJob || !cronJob.ftp) {
//             throw new Error("❌ Invalid cron job: No FTP details found.");
//         }

//         // Fetch FTP details dynamically
//         const ftpConfig = await findFtpById(cronJob.ftp.toString());
//         if (!ftpConfig) {
//             throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
//         }

//         console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);

//         // Initialize FTP client
//         const ftpClient = new Client();

//         ftpClient.on("ready", async () => {
//             console.log(`✅ FTP connection established.`);

//             const remoteDir = cronJob.schedule; // Ensure this contains a valid FTP path
//             if (!remoteDir) {
//                 console.error("❌ No FTP path specified in cronJob.schedule");
//                 ftpClient.end();
//                 return;
//             }

//             const localDir = path.join(__dirname, "../downloads"); 
//             if (!fs.existsSync(localDir)) {
//                 fs.mkdirSync(localDir, { recursive: true });
//             }

//             try {
//                 // List files in the directory
//                 ftpClient.list(remoteDir, (err, list) => {
//                     if (err) {
//                         console.error("❌ Error listing files:", err);
//                         ftpClient.end();
//                         return;
//                     }

//                     const xlsxFiles = list.filter(file => file.name.endsWith(".xlsx"));

//                     if (xlsxFiles.length === 0) {
//                         console.log("⚠️ No .xlsx files found to download.");
//                         ftpClient.end();
//                         return;
//                     }

//                     xlsxFiles.forEach(file => {
//                         const remotePath = `${remoteDir}/${file.name}`;
//                         const localPath = path.join(localDir, file.name);

//                         ftpClient.get(remotePath, (err, stream) => {
//                             if (err) {
//                                 console.error(`❌ Error downloading ${file.name}:`, err);
//                                 return;
//                             }

//                             stream.once("close", () => console.log(`✅ Downloaded: ${file.name}`));
//                             stream.pipe(fs.createWriteStream(localPath));
//                         });
//                     });
//                 });
//             } catch (error) {
//                 console.error("❌ Error downloading files:", error);
//             } finally {
//                 ftpClient.end(); // Close FTP connection
//             }

//             // Mark cron job as completed
//             await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
//         });

//         ftpClient.connect({
//             host: ftpConfig.host,
//             user: ftpConfig.ftpUser,
//             password: ftpConfig.password,
//         });
//     } catch (error) {
//         console.error("❌ FTP operation failed:", error);
//     }
// };


// // Helper function to recursively list and download files
// async function downloadAllFiles(ftpClient: Client, remotePath: string, localPath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.list(remotePath, async (err, files) => {
//             if (err) return reject(err);

//             for (const file of files) {
//                 const remoteFilePath = `${remotePath}/${file.name}`;
//                 const localFilePath = path.join(localPath, file.name);

//                 if (file.type === "d") {
//                     // Create local directory and recurse into it
//                     if (!fs.existsSync(localFilePath)) {
//                         fs.mkdirSync(localFilePath, { recursive: true });
//                     }
//                     await downloadAllFiles(ftpClient, remoteFilePath, localFilePath);
//                 } else {
//                     // Download individual file
//                     await downloadSingleFile(ftpClient, remoteFilePath, localFilePath);
//                 }
//             }
//             resolve();
//         });
//     });
// }

// // Helper function to download a single file
// async function downloadSingleFile(ftpClient: Client, remoteFilePath: string, localFilePath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.get(remoteFilePath, (err, stream) => {
//             if (err) return reject(err);

//             stream.once("close", () => resolve());
//             stream.pipe(fs.createWriteStream(localFilePath));
//         });
//     });
// }
// export const downloadFileFromFtp = async (cronJob: ICron) => {
//     try {
//         if (!cronJob || !cronJob.ftp) {
//             throw new Error("❌ Invalid cron job: No FTP details found.");
//         }

//         // Fetch FTP details dynamically
//         const ftpConfig = await findFtpById(cronJob.ftp.toString());
//         if (!ftpConfig) {
//             throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
//         }

//         console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);

//         // Initialize FTP client
//         const ftpClient = new Client();

//         ftpClient.on("ready", async () => {
//             console.log(`✅ FTP connection established.`);
//            console.log(`🔗 Connecting to FTP: ${ftpConfig.path}`);

//             const remoteDir = cronJob.path; // Ensure this contains a valid FTP path
//             if (!remoteDir) {
//                 console.error("❌ No FTP path specified in cronJob.schedule");
//                 ftpClient.end();
//                 return;
//             }
//             console.log(`📂 Checking FTP directory: ${remoteDir}`);

//             const localDir = path.join(__dirname, "../downloads"); 
//             if (!fs.existsSync(localDir)) {
//                 fs.mkdirSync(localDir, { recursive: true });
//             }

//             try {
//                 // Download only .xlsx files
//                 await downloadXlsxFiles(ftpClient, remoteDir, localDir);
//                 console.log("✅ All .xlsx files downloaded successfully.");
//             } catch (error) {
//                 console.error("❌ Error downloading .xlsx files:", error);
//             } finally {
//                 ftpClient.end(); // Close FTP connection
//             }

//             // Mark cron job as completed
//             await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
//         });

//         ftpClient.connect({
//             host: ftpConfig.host,
//             user: ftpConfig.ftpUser,
//             password: ftpConfig.password,
        
//         });
//     } catch (error) {
//         console.error("❌ FTP operation failed:", error);
//     }
// };

// import { Request, Response } from 'express';
// import * as XLSX from 'xlsx';
// // import fs from 'fs';
// // import { InputData } from './types';
// import { GetConversions, SaveConversion } from '@/services/fileConversion/conversion';
// import { CONVERSION_TYPE } from '@/api/models/convertedFiles/enums';
// import { AuthenticatedRequest } from '@/middlewares/types';
// import { FileConversionInout } from '@/services/fileConversion/types';
// import { ApiResponse } from '@/shared';
// import { ObjectId } from 'mongodb';
// import { InputData } from "@/api/controllers/convertedfile/types";




// export const downloadFileFromFtp = async (cronJob: ICron) => {
//     try {
//         if (!cronJob || !cronJob.ftp) {
//             throw new Error("❌ Invalid cron job: No FTP details found.");
//         }

//         // Fetch FTP details dynamically
//         const ftpConfig = await findFtpById(cronJob.ftp.toString());
//         if (!ftpConfig) {
//             throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
//         }

//         console.log(`📥 Downloading files from FTP for ID: ${cronJob.ftp}`);
//         console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);

//         // Initialize FTP client
//         const ftpClient = new Client();

//         ftpClient.on("ready", async () => {
//             console.log(`✅ FTP connection established.`);

//             const ftpPaths: string[] = Array.isArray(ftpConfig.path) ? ftpConfig.path : [ftpConfig.path];
//             console.log(`🔍 FTP Paths to Process:`, ftpPaths);

//             if (!ftpPaths.length) {
//                 console.error("❌ No FTP paths specified.");
//                 ftpClient.end();
//                 return;
//             }

//             const localDir = path.join(__dirname, "../downloads");
//             if (!fs.existsSync(localDir)) {
//                 fs.mkdirSync(localDir, { recursive: true });
//             }

//             for (const remoteDir of ftpPaths) {
//                 console.log(`📂 Processing FTP directory: ${remoteDir}`);

//                 try {
//                     await downloadXlsxFiles(ftpClient, remoteDir, localDir);
//                     console.log(`✅ All .xlsx files downloaded successfully from ${remoteDir}`);
//                 } catch (error) {
//                     console.error(`❌ Error downloading .xlsx files from ${remoteDir}:`, error);
//                 }
//             }

//             ftpClient.end(); // Close FTP connection
//             await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
//         });

//         ftpClient.connect({
//             host: ftpConfig.host,
//             user: ftpConfig.ftpUser,
//             password: ftpConfig.password,
//         });
//     } catch (error) {
//         console.error("❌ FTP operation failed:", error);
//     }
// };

// const headers: (keyof InputData)[] = [
//     "Handle", "Command", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags",
//     "Published", "Option1 Name", "Option1 Value", "Option1 Linked To",
//     "Option2 Name", "Option2 Value", "Option2 Linked To", "Option3 Name", "Option3 Value",
//     "Option3 Linked To", "Variant SKU", "Variant Grams", "Variant Inventory Tracker",
//     "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
//     "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
//     "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
//     "SEO Title", "SEO Description", "Google Shopping / Google Product Category",
//     "Google Shopping / Gender", "Google Shopping / Age Group", "Google Shopping / MPN",
//     "Google Shopping / Condition", "Google Shopping / Custom Product",
//     "Google Shopping / Custom Label 0", "Google Shopping / Custom Label 1",
//     "Google Shopping / Custom Label 2", "Google Shopping / Custom Label 3",
//     "Google Shopping / Custom Label 4"
//   ];
  
//   export const downloadAndConvertFile = async (req: Request, res: Response) => {
//     try {
//       const { fileName } = req.params;
//       const filePath = `./src/downloadedFiles/${fileName}`;
      
//       if (!fs.existsSync(filePath)) {
//         return res.status(404).send('File not found');
//       }
  
//       // Read the downloaded file
//       const sourceWorkbook = XLSX.readFile(filePath, { type: 'file', raw: true });
//       const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
//       const sourceData: any[] = XLSX.utils.sheet_to_json(sourceWorksheet);
  
//       // Format data
//       const formattedData = sourceData.map(row => {
//         const formattedRow: Partial<InputData> = {};
//         headers.forEach(header => {
//           formattedRow[header] = row[header] || '';
//         });
//         return formattedRow;
//       });
  
//       // Convert and save new file
//       const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers as string[] });
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
//       const convertedFileName = `converted_${fileName}`;
//       const convertedFilePath = `./src/convertedFiles/${convertedFileName}`;
//       const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
//       fs.writeFileSync(convertedFilePath, outputBuffer);
  
//       // Save conversion record
//       const conversionData = {
//         conversionType: CONVERSION_TYPE.SCHEDULE, // Change type
//         filePath: convertedFileName,
//         createdBy: (req as AuthenticatedRequest)?.user?._id,
//       } as FileConversionInout;
  
//       await SaveConversion(conversionData);
  
//       // Send the converted file as a response
//       res.setHeader('Content-Disposition', `attachment; filename=${convertedFileName}`);
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//       return res.send(outputBuffer);
//     } catch (error) {
//       console.error('Error in downloadAndConvertFile:', error);
//       return res.status(500).send('Internal Server Error');
//     }
//   };
  

// // Function to download only .xlsx files
// async function downloadXlsxFiles(ftpClient: Client, remotePath: string, localPath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.list(remotePath, async (err, files) => {
//             if (err) return reject(err);

//             const xlsxFiles = files.filter(file => file.name.trim().toLowerCase().endsWith(".xlsx"));
            
//             if (xlsxFiles.length === 0) {
//                 console.log("⚠️ No .xlsx files found to download.");
//                 return resolve();
//             }

//             for (const file of xlsxFiles) {
//                 const remoteFilePath = `${remotePath}/${file.name}`;
//                 const localFilePath = path.join(localPath, file.name);
                
//                 try {
//                     await downloadSingleFile(ftpClient, remoteFilePath, localFilePath);
//                     console.log(`✅ Downloaded: ${file.name}`);
//                 } catch (error) {
//                     console.error(`❌ Error downloading ${file.name}:`, error);
//                 }
//             }
//             resolve();
//         });
//     });
// }
// async function downloadCsvFiles(ftpClient: Client, remotePath: string, localPath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.list(remotePath, async (err, files) => {
//             if (err) return reject(err);

//             const csvFiles = files.filter(file => file.name.trim().toLowerCase().endsWith(".csv"));
            
//             if (csvFiles.length === 0) {
//                 console.log("⚠️ No .xlsx files found to download.");
//                 return resolve();
//             }

//             for (const file of csvFiles) {
//                 const remoteFilePath = `${remotePath}/${file.name}`;
//                 const localFilePath = path.join(localPath, file.name);
                
//                 try {
//                     await downloadSingleFile(ftpClient, remoteFilePath, localFilePath);
//                     console.log(`✅ Downloaded: ${file.name}`);
//                 } catch (error) {
//                     console.error(`❌ Error downloading ${file.name}:`, error);
//                 }
//             }
//             resolve();
//         });
//     });
// }

// // Helper function to download a single file
// async function downloadSingleFile(ftpClient: Client, remoteFilePath: string, localFilePath: string) {
//     return new Promise<void>((resolve, reject) => {
//         ftpClient.get(remoteFilePath, (err, stream) => {
//             if (err) return reject(err);

//             stream.once("close", () => resolve());
//             stream.pipe(fs.createWriteStream(localFilePath));
//         });
//     });
// }
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import  Client  from "ftp";
import { GetConversions, SaveConversion } from "@/services/fileConversion/conversion";
import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";
import { AuthenticatedRequest } from "@/middlewares/types";
import { FileConversionInout } from "@/services/fileConversion/types";
import { ObjectId } from "mongodb";
import { InputData } from "@/api/controllers/convertedfile/types";
import { CronStatus } from "@/api/models/cronJobs/enums";
import { ICron } from "@/api/models/cronJobs/types";
import cronService from "../cronService/cronService";
import { findFtpById } from "../ftp/ftp";

// Function to download files from FTP and convert them automatically
export const downloadFileFromFtp = async (cronJob: ICron) => {
    try {
        if (!cronJob || !cronJob.ftp) {
            throw new Error("❌ Invalid cron job: No FTP details found.");
        }

        const ftpConfig = await findFtpById(cronJob.ftp.toString());
        if (!ftpConfig) {
            throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
        }

        console.log(`📥 Downloading files from FTP for ID: ${cronJob.ftp}`);
        console.log(`🔗 Connecting to FTP: ${ftpConfig.host}`);

        const ftpClient = new Client();

        ftpClient.on("ready", async () => {
            console.log(`✅ FTP connection established.`);

            const ftpPaths: string[] = Array.isArray(ftpConfig.path) ? ftpConfig.path : [ftpConfig.path];
            console.log(`🔍 FTP Paths to Process:`, ftpPaths);

            if (!ftpPaths.length) {
                console.error("❌ No FTP paths specified.");
                ftpClient.end();
                return;
            }

            const localDir = path.join(__dirname, "../downloads");
            if (!fs.existsSync(localDir)) {
                fs.mkdirSync(localDir, { recursive: true });
            }

            for (const remoteDir of ftpPaths) {
                console.log(`📂 Processing FTP directory: ${remoteDir}`);

                try {
                    await downloadXlsxFiles(ftpClient, remoteDir, localDir);
                    console.log(`✅ All .xlsx files downloaded successfully from ${remoteDir}`);
                } catch (error) {
                    console.error(`❌ Error downloading .xlsx files from ${remoteDir}:`, error);
                }
            }

            ftpClient.end();
            await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
        });

        ftpClient.connect({
            host: ftpConfig.host,
            user: ftpConfig.ftpUser,
            password: ftpConfig.password,
        });
    } catch (error) {
        console.error("❌ FTP operation failed:", error);
    }
};

// Headers for file processing
const headers: (keyof InputData)[] = [
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
export const downloadAndConvertFile = async (req: Request, res: Response) => {
    try {
        const { fileName } = req.params;
        const filePath = `./src/downloadedFiles/${fileName}`;

        if (!fs.existsSync(filePath)) {
            return res.status(404).send("File not found");
        }

        // Read the downloaded file
        const sourceWorkbook = XLSX.readFile(filePath, { type: "file", raw: true });
        const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
        const sourceData: any[] = XLSX.utils.sheet_to_json(sourceWorksheet);

        // Format data
        const formattedData = sourceData.map(row => {
            const formattedRow: Partial<InputData> = {};
            headers.forEach(header => {
                formattedRow[header] = row[header] || "";
            });
            return formattedRow;
        });

        // Convert and save new file
        const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers as string[] });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const convertedFileName = `converted_${fileName}`;
        const convertedFilePath = `./src/convertedFiles/${convertedFileName}`;
        const outputBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        fs.writeFileSync(convertedFilePath, outputBuffer);

        // Save conversion record
        const conversionData = {
            conversionType: CONVERSION_TYPE.SCHEDULE,
            filePath: convertedFileName,
            createdBy: (req as AuthenticatedRequest)?.user?._id,
        } as FileConversionInout;

        await SaveConversion(conversionData);

        // Send the converted file as a response
        res.setHeader("Content-Disposition", `attachment; filename=${convertedFileName}`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return res.send(outputBuffer);
    } catch (error) {
        console.error("Error in downloadAndConvertFile:", error);
        return res.status(500).send("Internal Server Error");
    }
};

// Function to download only .xlsx files
async function downloadXlsxFiles(ftpClient: Client, remotePath: string, localPath: string) {
    return new Promise<void>((resolve, reject) => {
        ftpClient.list(remotePath, async (err, files) => {
            if (err) return reject(err);

            const xlsxFiles = files.filter(file => file.name.trim().toLowerCase().endsWith(".xlsx"));

            if (xlsxFiles.length === 0) {
                console.log("⚠️ No .xlsx files found to download.");
                return resolve();
            }

            for (const file of xlsxFiles) {
                const remoteFilePath = `${remotePath}/${file.name}`;
                const localFilePath = path.join(localPath, file.name);

                try {
                    await downloadSingleFile(ftpClient, remoteFilePath, localFilePath);
                    console.log(`✅ Downloaded: ${file.name}`);
                } catch (error) {
                    console.error(`❌ Error downloading ${file.name}:`, error);
                }
            }
            resolve();
        });
    });
}

// Function to download a single file
async function downloadSingleFile(ftpClient: Client, remoteFilePath: string, localFilePath: string) {
    return new Promise<void>((resolve, reject) => {
        ftpClient.get(remoteFilePath, (err, stream) => {
            if (err) return reject(err);

            stream.once("close", () => resolve());
            stream.pipe(fs.createWriteStream(localFilePath));
        });
    });
}
