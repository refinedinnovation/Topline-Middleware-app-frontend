import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares/types";
export declare const GetAll: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetAllPaginatedTasks: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetFilteredTasks: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
