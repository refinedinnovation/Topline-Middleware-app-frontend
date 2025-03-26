import { IFtp } from './types';
declare const Ftp: import("mongoose").Model<IFtp, {}, {}, {}, import("mongoose").Document<unknown, {}, IFtp> & IFtp & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Ftp;
