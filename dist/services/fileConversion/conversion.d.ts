import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";
import { FileConversionInout } from "./types";
export declare const SaveConversion: (data: FileConversionInout) => Promise<import("mongoose").Document<unknown, {}, import("../../api/models/convertedFiles/types").IConvertedFile> & import("../../api/models/convertedFiles/types").IConvertedFile & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const DownloadConvertedFile: (fileName: string) => Buffer<ArrayBufferLike>;
export declare const GetConversions: () => Promise<CONVERSION_TYPE[]>;
