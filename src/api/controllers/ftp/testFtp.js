"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ftpTest = void 0;
const ftpConnector_1 = require("@/services/connector/ftpConnector");
const ftp_1 = require("@/services/ftp/ftp");
const shared_1 = require("@/shared");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const ftpTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('FTP test');
    const ftpId = req.params.id;
    console.log('FTP ID:', ftpId);
    const ftpConfig = yield (0, ftp_1.findFtpById)(ftpId);
    console.log('FTP config:', ftpConfig);
    if (!ftpConfig) {
        throw new Error('FTP configuration not found');
    }
    try {
        const connection = yield (0, ftpConnector_1.connectFtp)(ftpConfig);
        console.log('FTP connection:', connection);
        const desktopPath = path_1.default.join(os_1.default.homedir(), 'Desktop', 'downloaded_file.csv');
        const downloadedFile = yield (0, ftpConnector_1.downloadFile)('./ftp-test/products_export_1.csv', desktopPath);
        console.log('Downloaded file:', downloadedFile);
    }
    catch (error) {
        console.error('FTP operation failed:', error);
    }
    finally {
        (0, ftpConnector_1.closeFtpConnection)();
    }
    return (0, shared_1.ApiResponse)(true, "test", {}, 201, res);
});
exports.ftpTest = ftpTest;
