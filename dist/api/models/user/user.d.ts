import { Document, Types } from "mongoose";
import { IUse } from "./type";
declare const User: import("mongoose").Model<IUse, {}, {}, {}, Document<unknown, {}, IUse> & IUse & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default User;
