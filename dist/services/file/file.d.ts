import { Request, Response } from "express";
import { ICron } from "@/api/models/cronJobs/types";
export declare const downloadFileFromFtp: (cronJob: ICron) => Promise<void>;
export declare const downloadAndConvertFile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
