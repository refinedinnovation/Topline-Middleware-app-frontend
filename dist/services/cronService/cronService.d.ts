import { CronStatus } from '@/api/models/cronJobs/enums';
import { ICron } from '@/api/models/cronJobs/types';
import mongoose from 'mongoose';
export declare class CronService {
    getCronsByFtp(arg0: mongoose.Types.ObjectId): void;
    deleteCron(arg0: mongoose.Types.ObjectId): void;
    createCron(ftpId: mongoose.Types.ObjectId, operations: string[], createdBy?: mongoose.Types.ObjectId): Promise<ICron>;
    scheduleCronJob(cronJob: ICron): Promise<void>;
    processCronJob(cronJob: ICron): Promise<void>;
    updateCronStatus(cronId: mongoose.Types.ObjectId, status: CronStatus, lastRun?: Date): Promise<ICron | null>;
    getPendingCrons(): Promise<ICron[]>;
    runPendingCrons(): Promise<void>;
    createRecurringDownloadJob(): Promise<void>;
}
declare const cronService: CronService;
export default cronService;
