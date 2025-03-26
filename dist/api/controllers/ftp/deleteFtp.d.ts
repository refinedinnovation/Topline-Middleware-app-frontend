import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares/types";
export declare const DeleteFtp: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
