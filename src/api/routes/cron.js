"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cronController_1 = __importDefault(require("../controllers/cron/cronController"));
const router = (0, express_1.Router)();
router.post('/create', cronController_1.default.createCron);
router.get('/cron/ftp/:ftpId', cronController_1.default.getCronsByFtp);
router.put('/cron/status', cronController_1.default.updateCronStatus);
router.delete('/cron/:cronId', cronController_1.default.deleteCron);
exports.default = router;
