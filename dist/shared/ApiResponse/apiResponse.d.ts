import { Response } from "express";
export declare const ApiResponse: (status: boolean, // First argument should be a boolean
message: string, // Second argument should be a string
data: any, // Third argument should be any data
apiStatus: number | undefined, // Fourth argument should be a number (HTTP status)
response: Response) => Response<any, Record<string, any>>;
