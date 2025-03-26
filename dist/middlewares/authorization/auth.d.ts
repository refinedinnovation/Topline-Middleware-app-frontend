import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types";
export declare const Authorization: (permission: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
