import { NextFunction, Request, Response } from "express";
export declare const AsyncWrapper: (fn: any) => (req: Request, res: Response, Next: NextFunction) => Promise<any>;
