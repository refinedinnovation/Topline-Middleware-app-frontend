import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";
export interface FileConversionInout {
    filePath: string;
    conversionType: CONVERSION_TYPE;
    vendor: string;
    companyName: string;
    userName: string;
    createdBy: string;
}
