import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types";
export declare const Authentication: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
