import { Schema } from 'mongoose';
import { ICron } from './types';
declare const Cron: import("mongoose").Model<ICron, {}, {}, {}, import("mongoose").Document<unknown, {}, ICron> & ICron & Required<{
    _id: Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Cron;
