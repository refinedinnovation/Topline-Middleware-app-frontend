import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares/types';
export declare const uploadAndConvertFile: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const getAllConvertedFiles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const downloadConvertedFile: (req: Request, res: Response) => Promise<Response | void>;
export declare const downloadAndConvertFile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
