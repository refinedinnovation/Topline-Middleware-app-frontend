"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const utils_1 = require("@/utils");
const common_1 = require("@/validators/common");
const addFtp_1 = require("../controllers/ftp/addFtp");
const getAllFtp_1 = require("../controllers/ftp/getAllFtp");
const updateFtp_1 = require("../controllers/ftp/updateFtp");
const deleteFtp_1 = require("../controllers/ftp/deleteFtp");
const testFtp_1 = require("../controllers/ftp/testFtp");
const router = (0, express_1.Router)();
router.post('/create', (0, utils_1.AsyncWrapper)(addFtp_1.AddFtp));
router.get('/getAll', (0, utils_1.AsyncWrapper)(getAllFtp_1.getAllFtp));
router.put('/update/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, utils_1.AsyncWrapper)(updateFtp_1.UpdateFtp));
router.delete('/delete/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, utils_1.AsyncWrapper)(deleteFtp_1.DeleteFtp));
router.get('/test/:email', (0, utils_1.AsyncWrapper)(testFtp_1.ftpTest));
exports.default = router;
//# sourceMappingURL=ftp.js.map