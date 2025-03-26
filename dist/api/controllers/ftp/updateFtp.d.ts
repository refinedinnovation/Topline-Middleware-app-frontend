import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares/types";
export declare const UpdateFtp: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
