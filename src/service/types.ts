export interface APIResponse<T = any> {
    status: number;
    message: string;
    statusText: string;
    data: [];
}
  interface OnlyData {
    data: {} | [] | null;
    _id: Object;
  }
  