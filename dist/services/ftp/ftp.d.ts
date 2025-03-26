import { FtpInput } from './types';
import { IFtp } from '@/api/models/ftp/types';
import { Document } from 'mongoose';
type LeanIFtp = Omit<IFtp & Document, keyof Document>;
export declare const findFtpById: (id: string) => Promise<LeanIFtp | null>;
export declare const getAll: () => Promise<IFtp[]>;
export declare const createFtpInBulk: (ftp: FtpInput[]) => Promise<import("mongoose").MergeType<Document<unknown, {}, IFtp> & IFtp & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<FtpInput, "_id">>[]>;
export declare const createFtp: (ftp: FtpInput) => Promise<IFtp>;
export declare const updateFtp: (id: string, user: FtpInput) => Promise<IFtp | null>;
export declare const bulkUpdate: (ftp: FtpInput[], userId: string, currentUser: string) => Promise<import("mongoose").MergeType<Document<unknown, {}, IFtp> & IFtp & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<FtpInput, "_id">>[]>;
export declare const deleteFtp: (id: string) => Promise<IFtp | null>;
export {};
