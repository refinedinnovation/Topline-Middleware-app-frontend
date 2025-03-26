"use strict";
// import ftp  from 'ftp';
// import Client from 'ftp';
// import fs from 'fs';
// import { IFtp } from '@/api/models/ftp/types'; 
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileFromFtp = exports.closeFtpConnection = exports.uploadFile = exports.downloadFile = exports.listFiles = exports.connectFtp = void 0;
const tslib_1 = require("tslib");
// let client: Client;
// export const connectFtp = (ftpConfig?: IFtp): Promise<void> => {
//     client = new ftp();
//     return new Promise((resolve, reject) => {
//         client.connect({
//             // host: "peachpuff-sparrow-800223.hostingersite.com",
//             // user: "u490611197.devadmin",
//             // password: "@Devadmin2024@",
//             host:"ftp.fitwellhub.com",
//             user:"u401759985.admin",
//             password:">6466_Zk!}",
//         });
//         client.on('ready', () => {
//             console.log('FTP connection established.');
//             resolve();
//         });
//         client.on('error', (err) => {
//             console.error('FTP connection error:', err);
//             reject(err);
//         });
//     });
// };
// export const listFiles = (remotePath: string): Promise<ftp.ListingElement[]> => {
//     return new Promise((resolve, reject) => {
//         client.list(remotePath, (err, list) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(list);
//             }
//         });
//     });
// };
// export const downloadFile = (remotePath: string, localPath: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         client.get(remotePath, (err, stream) => {
//             if (err) {
//                 return reject(err);
//             }
//             stream.once('close', () => {
//                 console.log('Download completed.');
//                 resolve();
//             });
//             stream.pipe(fs.createWriteStream(localPath));
//         });
//     });
// };
// export const uploadFile = (localPath: string, remotePath: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         client.put(localPath, remotePath, (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log('Upload completed.');
//                 resolve();
//             }
//         });
//     });
// };
// export const closeFtpConnection = (): void => {
//     if (client) {
//         client.end();
//         console.log('FTP connection closed.');
//     }
// }; 
const ftp_1 = tslib_1.__importDefault(require("ftp"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const ftp_2 = require("../ftp/ftp");
const cronService_1 = tslib_1.__importDefault(require("../cronService/cronService"));
const enums_1 = require("@/api/models/cronJobs/enums");
let client;
const connectFtp = (ftpConfig) => {
    client = new ftp_1.default();
    return new Promise((resolve, reject) => {
        if (!ftpConfig) {
            return reject(new Error('FTP configuration is missing'));
        }
        client.connect({
            host: ftpConfig.host,
            user: ftpConfig.ftpUser,
            password: ftpConfig.password,
        });
        client.on('ready', () => {
            console.log('✅ FTP connection established.');
            resolve();
        });
        client.on('error', (err) => {
            console.error('❌ FTP connection error:', err);
            reject(err);
        });
    });
};
exports.connectFtp = connectFtp;
const listFiles = (remotePath) => {
    return new Promise((resolve, reject) => {
        client.list(remotePath, (err, list) => {
            if (err)
                reject(err);
            else
                resolve(list);
        });
        console.log(`📋 Files in directory (${remotePath}):`, exports.listFiles);
    });
};
exports.listFiles = listFiles;
const downloadFile = (remotePath, localPath) => {
    return new Promise((resolve, reject) => {
        client.get(remotePath, (err, stream) => {
            if (err)
                return reject(err);
            stream.once('close', () => {
                console.log('✅ Download completed:', localPath);
                resolve();
            });
            stream.pipe(fs_1.default.createWriteStream(localPath));
        });
    });
};
exports.downloadFile = downloadFile;
const uploadFile = (localPath, remotePath) => {
    return new Promise((resolve, reject) => {
        client.put(localPath, remotePath, (err) => {
            if (err)
                reject(err);
            else {
                console.log('✅ Upload completed:', remotePath);
                resolve();
            }
        });
    });
};
exports.uploadFile = uploadFile;
const closeFtpConnection = () => {
    if (client) {
        client.end();
        console.log('✅ FTP connection closed.');
    }
};
exports.closeFtpConnection = closeFtpConnection;
const downloadFileFromFtp = async (cronJob) => {
    try {
        if (!cronJob || !cronJob.ftp) {
            throw new Error('❌ Invalid cron job: No FTP details found.');
        }
        const ftpConfig = await (0, ftp_2.findFtpById)(cronJob.ftp.toString());
        if (!ftpConfig) {
            throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
        }
        await (0, exports.connectFtp)(ftpConfig);
        const remoteDir = cronJob.schedule;
        if (!remoteDir) {
            console.error('❌ No FTP path specified in cronJob.schedule');
            (0, exports.closeFtpConnection)();
            return;
        }
        const localDir = path_1.default.join(__dirname, '../downloads');
        if (!fs_1.default.existsSync(localDir)) {
            fs_1.default.mkdirSync(localDir, { recursive: true });
        }
        await downloadAllFiles(remoteDir, localDir);
        console.log('✅ All files downloaded successfully.');
        (0, exports.closeFtpConnection)();
        await cronService_1.default.updateCronStatus(cronJob.id, enums_1.CronStatus.COMPLETED, new Date());
    }
    catch (error) {
        console.error('❌ FTP operation failed:', error);
    }
};
exports.downloadFileFromFtp = downloadFileFromFtp;
const downloadAllFiles = (remotePath, localPath) => {
    return new Promise((resolve, reject) => {
        client.list(remotePath, async (err, files) => {
            if (err)
                return reject(err);
            for (const file of files) {
                const remoteFilePath = `${remotePath}/${file.name}`;
                const localFilePath = path_1.default.join(localPath, file.name);
                if (file.type === 'd') {
                    if (!fs_1.default.existsSync(localFilePath)) {
                        fs_1.default.mkdirSync(localFilePath, { recursive: true });
                    }
                    await downloadAllFiles(remoteFilePath, localFilePath);
                }
                else {
                    await (0, exports.downloadFile)(remoteFilePath, localFilePath);
                }
            }
            resolve();
        });
    });
};
//# sourceMappingURL=ftpConnector.js.map