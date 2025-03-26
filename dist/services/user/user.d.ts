import { UserInput } from './types';
import { IUser } from '@/api/models/user/type';
export declare const findByEmail: (email: string) => Promise<IUser | null>;
export declare const findById: (_id: string) => Promise<IUser | null>;
export declare const getAll: (isVendorOnly?: boolean) => Promise<IUser[]>;
export declare const createUser: (user: UserInput) => Promise<IUser>;
export declare const updateUser: (email: string, user: UserInput) => Promise<IUser | null>;
export declare const deleteUser: (email: string) => Promise<IUser>;
export declare const loginWithEmail: (user: string, password: string) => Promise<any>;
