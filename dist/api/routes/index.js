"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = tslib_1.__importDefault(require("./auth"));
const user_1 = tslib_1.__importDefault(require("./user"));
const task_1 = tslib_1.__importDefault(require("./task"));
const ftp_1 = tslib_1.__importDefault(require("./ftp"));
const vendor_1 = tslib_1.__importDefault(require("./vendor"));
const convertedFile_1 = tslib_1.__importDefault(require("./convertedFile"));
const cron_1 = tslib_1.__importDefault(require("./cron"));
const middlewares_1 = require("@/middlewares");
const enum_1 = require("../models/user/enum");
const utils_1 = require("@/utils");
const convertedfile_1 = require("../controllers/convertedfile");
router.use('/auth', auth_1.default);
router.use('/user', 
//  Authentication, Authorization([UserRoles.ADMIN]),
user_1.default);
router.use('/task', 
//  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
task_1.default);
router.use('/ftp', 
//  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
ftp_1.default);
router.use('/vendor', 
//  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
vendor_1.default);
// router.use('/convert', Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]), convert);
router.use('/convert', middlewares_1.Authentication, (0, middlewares_1.Authorization)([enum_1.UserRoles.ADMIN, enum_1.UserRoles.USER]), convertedFile_1.default);
router.use('/file/download/:fileName', (0, utils_1.AsyncWrapper)(convertedfile_1.downloadConvertedFile));
router.use('/cron', 
//  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]), 
cron_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map