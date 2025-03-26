import { Request, Response } from 'express';
export declare class CronController {
    createCron(req: Request, res: Response): Promise<void>;
    getCronsByFtp(req: Request, res: Response): Promise<void>;
    updateCronStatus(req: Request, res: Response): Promise<void>;
    deleteCron(req: Request, res: Response): Promise<void>;
}
declare const _default: CronController;
export default _default;
