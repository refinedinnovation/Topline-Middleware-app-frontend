import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@/shared";
import { boolean } from "joi";

export const AsyncWrapper = (fn: any) => async (req: Request, res: Response, Next: NextFunction,  ) => {
    try {
        const result = await fn(req, res);
        
        return result; 
    } catch (error) {
        console.log(error)
        // return ApiResponse(false, error, 500, res, Next);
        return ApiResponse(false, error.message,status, 500);
    }
}
