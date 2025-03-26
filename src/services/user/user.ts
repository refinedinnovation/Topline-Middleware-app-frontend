import bcrypt from 'bcryptjs';
import User from '@/api/models/user/user';
import { UserInput } from './types';
import { IUser } from '@/api/models/user/type';
import { IError } from '@/utils/CustomError';
import Ftp from '@/api/models/ftp/ftp';

export const findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email }).lean<IUser>().exec();  
    return user as IUser;
  };

export const findById = async (_id: string): Promise<IUser | null> => {
    const user = await User.findById({_id}).lean<IUser>().exec();  
    return user as IUser;
};


export const getAll = async (isVendorOnly: boolean = false): Promise<IUser[]> => {
    const query = { isVendorOnly } as { isVendorOnly: boolean };
    const users = await User.find(query).populate('ftps'); // Don't use lean()
  
    return users;
  };


export const createUser = async (user: UserInput): Promise<IUser> => {
    const findUser = await User.findOne({ $or: [{ email: user?.email }, { username: user?.firstName }] }).lean();
    if (findUser) {
        throw new IError('Vendor already exists', 409);
    }
    const password = await bcrypt?.hash(user.password, 10);
    const newUser = new User({ ...user, password });
    return await newUser.save(); 
};
// export const disableUser = async (id: string, user: UserInput): Promise<IUser> => {
//     const findUser = await User.findOne({ $or: [{ email: user?.email }, { username: user?.userName }] }).lean();
//     if (findUser) {
//         throw new IError('Vendor already exists', 409);
//     }
//     const password = await bcrypt?.hash(user.password, 10);
//     const newUser = new User({ ...user, password });
//     return await newUser.save(); 
// };

export const updateUser = async (email: string, user: UserInput): Promise<IUser | null> => {
    const checkUser = await findByEmail(email);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const newPassword = await bcrypt?.hash(user.password, 10);
    const updatedUser = await User.findByIdAndUpdate(email, { ...user, password: newPassword }, { new: true });
    return updatedUser;
}

export const deleteUser = async (email: string) => {
    // await User.findOne({ $or: [{ email: user?.email }, { id: user?._id }] }).lean();
    const checkUser = await findByEmail(email);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const vendor = await User.findByIdAndDelete();
    if(!vendor){
        throw new IError('Vendor not found', 404);
    }
    await Ftp.deleteMany({});
    return checkUser;
};

// export const loginWithEmail: (arg0: string, arg1: string) => any (user: string, password: string) => {
//     const findUser = await User.findOne({ $or: [{ email: user }, { username: user }] }).lean();
//     if (!findUser) {
//         throw new IError('Invalid Credentials', 401);
//     }
//     const isMatch = await bcrypt.compare(password, findUser?.password);
//     if (!isMatch) {
//         throw new IError('Invalid Credentials', 401);
//     }
//     return findUser;
// }; 
export const loginWithEmail = async (user: string, password: string): Promise<any> => {
    // Find the user by email or username
    const findUser = await User.findOne({ $or: [{ email: user }, { userName: user }] }).lean();
    
    // Check if the user exists
    if (!findUser) {
      throw new IError('Invalid Credentials', 401);
    }
    
    // Verify the password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw new IError('Invalid Credentials', 401);
    }
    
    return findUser;
  };