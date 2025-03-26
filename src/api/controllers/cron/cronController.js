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
exports.CronController = void 0;
const cronService_1 = __importDefault(require("@/services/cronService/cronService"));
const mongoose_1 = __importDefault(require("mongoose"));
class CronController {
    createCron(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ftpId, operations, schedule } = req.body;
                const cronJob = yield cronService_1.default.createCron(new mongoose_1.default.Types.ObjectId(ftpId), operations, schedule);
                return res.status(201).json(cronJob);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    getCronsByFtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ftpId } = req.params;
                const cronJobs = yield cronService_1.default.getCronsByFtp(new mongoose_1.default.Types.ObjectId(ftpId));
                return res.status(200).json(cronJobs);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    updateCronStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cronId, status } = req.body;
                const updatedCron = yield cronService_1.default.updateCronStatus(new mongoose_1.default.Types.ObjectId(cronId), status);
                if (!updatedCron) {
                    return res.status(404).json({ error: 'Cron job not found' });
                }
                return res.status(200).json(updatedCron);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    deleteCron(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cronId } = req.params;
                yield cronService_1.default.deleteCron(new mongoose_1.default.Types.ObjectId(cronId));
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CronController = CronController;
exports.default = new CronController();
