"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("@/utils");
const convertFile_1 = require("../controllers/convertedfile/convertFile");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/uploadAndConvertFile', upload.single('file'), (0, utils_1.AsyncWrapper)(convertFile_1.uploadAndConvertFile));
router.get('/getAll', (0, utils_1.AsyncWrapper)(convertFile_1.getAllConvertedFiles));
router.get('/download/:fileName', (0, utils_1.AsyncWrapper)(convertFile_1.downloadConvertedFile));
exports.default = router;
