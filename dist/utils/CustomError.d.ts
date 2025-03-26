export declare class IError extends Error {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode: number);
}
