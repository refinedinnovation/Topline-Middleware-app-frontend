export interface FtpInput {
    host: string;
    ftpUser: string;
    password: string;
    user: string;
    path: string;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    isSecure: boolean;
}
