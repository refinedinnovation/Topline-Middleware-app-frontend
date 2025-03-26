"use strict";
// import cronService from '@/services/cronService/cronService';
// import { Request, Response } from 'express';
// import mongoose from 'mongoose';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronController = void 0;
const tslib_1 = require("tslib");
// export class CronController {
//   async createCron(req: Request, res: Response): Promise<Response> {
//     try {
//       const { ftpId, operations, schedule } = req.body;
//       const cronJob = await cronService.createCron(new mongoose.Types.ObjectId(ftpId), operations, schedule);
//       return res.status(201).json(cronJob);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
//   async getCronsByFtp(req: Request, res: Response): Promise<Response> {
//     try {
//       const { ftpId } = req.params;
//       const cronJobs = await cronService.getCronsByFtp(new mongoose.Types.ObjectId(ftpId));
//       return res.status(200).json(cronJobs);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
//   async updateCronStatus(req: Request, res: Response): Promise<Response> {
//     try {
//       const { cronId, status } = req.body;
//       const updatedCron = await cronService.updateCronStatus(new mongoose.Types.ObjectId(cronId), status);
//       if (!updatedCron) {
//         return res.status(404).json({ error: 'Cron job not found' });
//       }
//       return res.status(200).json(updatedCron);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
//   async deleteCron(req: Request, res: Response): Promise<Response> {
//     try {
//       const { cronId } = req.params;
//       await cronService.deleteCron(new mongoose.Types.ObjectId(cronId));
//       return res.status(204).send();
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
// }
// export default new CronController();
const cronService_1 = tslib_1.__importDefault(require("@/services/cronService/cronService"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class CronController {
    async createCron(req, res) {
        try {
            const { ftpId, operations, schedule } = req.body;
            const cronJob = await cronService_1.default.createCron(new mongoose_1.default.Types.ObjectId(ftpId), operations, schedule);
            res.status(201).json(cronJob); // No return statement
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getCronsByFtp(req, res) {
        try {
            const { ftpId } = req.params;
            const cronJobs = await cronService_1.default.getCronsByFtp(new mongoose_1.default.Types.ObjectId(ftpId));
            res.status(200).json(cronJobs);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateCronStatus(req, res) {
        try {
            const { cronId, status } = req.body;
            const updatedCron = await cronService_1.default.updateCronStatus(new mongoose_1.default.Types.ObjectId(cronId), status);
            if (!updatedCron) {
                res.status(404).json({ error: 'Cron job not found' });
                return;
            }
            res.status(200).json(updatedCron);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteCron(req, res) {
        try {
            const { cronId } = req.params;
            await cronService_1.default.deleteCron(new mongoose_1.default.Types.ObjectId(cronId));
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.CronController = CronController;
exports.default = new CronController();
//# sourceMappingURL=cronController.js.map