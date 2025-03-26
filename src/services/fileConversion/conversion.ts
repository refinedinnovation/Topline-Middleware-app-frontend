import ConvertedFile from "@/api/models/convertedFiles/convertedFile";
import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";
import { FileConversionInout } from "./types";
import fs from 'fs';


export const SaveConversion = async (data: FileConversionInout) => {
    const convertedFile = await ConvertedFile.create(data);
    return convertedFile;
};

// export const GetConversions = async () => {
//     const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
//     return conversions;
// };
// export const GetConversions = async (): Promise<ConvertedFileType[]> => {
//     const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
//     return conversions;
// };

export const DownloadConvertedFile = (fileName:string) => {
    const filePath = `./src/convertedFiles/${fileName}`;
    const file = fs.readFileSync(filePath);
    return file;
}

// import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";
// import ConvertedFile from "@/api/models/convertedFiles/convertedFile";
// import { FileConversionInout } from "./types";
// import fs from 'fs';

// export const SaveConversion = async (data: FileConversionInout) => {
//     const convertedFile = await ConvertedFile.create(data);
//     return convertedFile;
// };

// // Adjusting the return type and using 'unknown' for type assertion
export const GetConversions = async (): Promise<CONVERSION_TYPE[]> => {
    const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
    
    // Use 'unknown' first, and then cast to 'CONVERSION_TYPE[]' for type safety
    return conversions as unknown as CONVERSION_TYPE[]; // Double casting, be cautious
};

// export const DownloadConvertedFile = (fileName: string) => {
//     const filePath = `./src/convertedFiles/${fileName}`;
//     const file = fs.readFileSync(filePath);
//     return file;
// };
 
// import ConvertedFile from "@/api/models/convertedFiles/convertedFile"; // Assuming your model is correctly imported
// import { FileConversionInout } from "./types";  // Your input type for SaveConversion
// import fs from 'fs';

// // SaveConversion function remains unchanged
// export const SaveConversion = async (data: FileConversionInout): Promise<ConvertedFileType> => {
//     const convertedFile = await ConvertedFile.create(data);
//     return convertedFile;
// };

// // Add the type annotation for GetConversions
// export const GetConversions = async (): Promise<ConvertedFileType[]> => {
//     const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
//     return conversions;
// };

// // DownloadConvertedFile function remains unchanged
// export const DownloadConvertedFile = (fileName: string) => {
//     const filePath = `./src/convertedFiles/${fileName}`;
//     const file = fs.readFileSync(filePath);
//     return file;
// };
