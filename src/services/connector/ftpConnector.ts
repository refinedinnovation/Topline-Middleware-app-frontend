// import ftp  from 'ftp';
// import Client from 'ftp';
// import fs from 'fs';
// import { IFtp } from '@/api/models/ftp/types'; 

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
import ftp from 'ftp';
import Client from 'ftp';
import fs from 'fs';
import path from 'path';
import { IFtp } from '@/api/models/ftp/types'; 
import { findFtpById } from '../ftp/ftp';
import cronService from '../cronService/cronService';
import { ICron } from '@/api/models/cronJobs/types';
import { CronStatus } from '@/api/models/cronJobs/enums';

let client: Client;

export const connectFtp = (ftpConfig?: IFtp): Promise<void> => {
    client = new ftp();

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

export const listFiles = (remotePath: string): Promise<ftp.ListingElement[]> => {
    return new Promise((resolve, reject) => {
        client.list(remotePath, (err, list) => {
            if (err) reject(err);
            else resolve(list);
        });
        console.log(`📋 Files in directory (${remotePath}):`, listFiles);
    });
};

export const downloadFile = (remotePath: string, localPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        client.get(remotePath, (err, stream) => {
            if (err) return reject(err);
            
            stream.once('close', () => {
                console.log('✅ Download completed:', localPath);
                resolve();
            });
            stream.pipe(fs.createWriteStream(localPath));
        });
    });
};

export const uploadFile = (localPath: string, remotePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        client.put(localPath, remotePath, (err) => {
            if (err) reject(err);
            else {
                console.log('✅ Upload completed:', remotePath);
                resolve();
            }
        });
    });
};

export const closeFtpConnection = (): void => {
    if (client) {
        client.end();
        console.log('✅ FTP connection closed.');
    }
};

export const downloadFileFromFtp = async (cronJob: ICron) => {
    try {
        if (!cronJob || !cronJob.ftp) {
            throw new Error('❌ Invalid cron job: No FTP details found.');
        }

        const ftpConfig = await findFtpById(cronJob.ftp.toString());
        if (!ftpConfig) {
            throw new Error(`❌ FTP configuration not found for ID: ${cronJob.ftp}`);
        }

        await connectFtp(ftpConfig);
        const remoteDir = cronJob.schedule;
        if (!remoteDir) {
            console.error('❌ No FTP path specified in cronJob.schedule');
            closeFtpConnection();
            return;
        }

        const localDir = path.join(__dirname, '../downloads');
        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }

        await downloadAllFiles(remoteDir, localDir);
        console.log('✅ All files downloaded successfully.');

        closeFtpConnection();
        await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
    } catch (error) {
        console.error('❌ FTP operation failed:', error);
    }
};

const downloadAllFiles = (remotePath: string, localPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        client.list(remotePath, async (err, files) => {
            if (err) return reject(err);

            for (const file of files) {
                const remoteFilePath = `${remotePath}/${file.name}`;
                const localFilePath = path.join(localPath, file.name);

                if (file.type === 'd') {
                    if (!fs.existsSync(localFilePath)) {
                        fs.mkdirSync(localFilePath, { recursive: true });
                    }
                    await downloadAllFiles(remoteFilePath, localFilePath);
                } else {
                    await downloadFile(remoteFilePath, localFilePath);
                }
            }
            resolve();
        });
    });
};
