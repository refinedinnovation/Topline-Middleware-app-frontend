import { IConvertedFile } from './types';
declare const ConvertedFile: import("mongoose").Model<IConvertedFile, {}, {}, {}, import("mongoose").Document<unknown, {}, IConvertedFile> & IConvertedFile & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default ConvertedFile;
