export interface ApiResponseParams<T = any> {
    status: boolean;
    message: string;
    data: any;
    timestamp?: string;
}
