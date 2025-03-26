"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ftpTest = void 0;
const tslib_1 = require("tslib");
const ftpConnector_1 = require("@/services/connector/ftpConnector");
const ftp_1 = require("@/services/ftp/ftp");
const shared_1 = require("@/shared");
const path_1 = tslib_1.__importDefault(require("path"));
const os_1 = tslib_1.__importDefault(require("os"));
const ftpTest = async (req, res) => {
    console.log('FTP test');
    const ftpId = req.params.id;
    console.log('FTP ID:', ftpId);
    const ftpConfig = await (0, ftp_1.findFtpById)(ftpId);
    console.log('FTP config:', ftpConfig);
    if (!ftpConfig) {
        throw new Error('FTP configuration not found');
    }
    try {
        const connection = await (0, ftpConnector_1.connectFtp)(ftpConfig);
        console.log('FTP connection:', connection);
        const desktopPath = path_1.default.join(os_1.default.homedir(), 'Desktop', 'downloaded_file.csv');
        const downloadedFile = await (0, ftpConnector_1.downloadFile)('./ftp-test/products_export_1.csv', desktopPath);
        console.log('Downloaded file:', downloadedFile);
    }
    catch (error) {
        console.error('FTP operation failed:', error);
    }
    finally {
        (0, ftpConnector_1.closeFtpConnection)();
    }
    return (0, shared_1.ApiResponse)(true, "test", {}, 201, res);
};
exports.ftpTest = ftpTest;
//# sourceMappingURL=testFtp.js.map