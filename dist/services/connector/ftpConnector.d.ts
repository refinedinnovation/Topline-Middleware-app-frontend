import ftp from 'ftp';
import { IFtp } from '@/api/models/ftp/types';
import { ICron } from '@/api/models/cronJobs/types';
export declare const connectFtp: (ftpConfig?: IFtp) => Promise<void>;
export declare const listFiles: (remotePath: string) => Promise<ftp.ListingElement[]>;
export declare const downloadFile: (remotePath: string, localPath: string) => Promise<void>;
export declare const uploadFile: (localPath: string, remotePath: string) => Promise<void>;
export declare const closeFtpConnection: () => void;
export declare const downloadFileFromFtp: (cronJob: ICron) => Promise<void>;
