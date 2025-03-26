export interface User {
_id: string;
  firstName: string;
  avatar?: string;
  email: string;
  lastName: string;
  contactNumber: number;
  companyName: string;
  companyAddress: string;
  [key: string]: unknown;
  status:string;
}
