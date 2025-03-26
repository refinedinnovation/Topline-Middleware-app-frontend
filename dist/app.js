"use strict";
// // import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// // import dotenv from 'dotenv';
// // import { isCelebrateError } from 'celebrate';
// // import cors from 'cors';
// // import helmet from 'helmet';
// // import { json } from 'body-parser';
// // import routes from './api/routes';
// // import errorHandler from './middlewares/validation/errorHandler';
// // import dbConnector from './config/database';
// // import cron from 'node-cron';
// // import { closeFtpConnection, connectFtp, downloadFile } from './services/connector/ftpConnector';
// // import path from 'path';
// // import os from 'os';
// // import mongoose from 'mongoose';
// // import cronService from './services/cronService/cronService';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// // const app = express();
// // dotenv.config();
// // const port = "http://localhost:3000/";
// // app.use(json({ limit: '50mb' }));
// // app.use(express.json());
// // app.use(cors({ origin: true, credentials: true }));
// // app.use(helmet());
// // dbConnector();
// // app.get('/', (req: Request, res: Response) => { res.send('Welcome to Vendor-Management.') });
// // app.use('/api/v1', routes);
// // app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
// //     if (isCelebrateError(err)) {
// //         return errorHandler(err, req, res, next);
// //     }
// // });
// // cron.schedule('*/1 * * * *',
// //     async () => {
// //         const pendingCrons = await cronService.getPendingCrons();
// //         console.log('Pending crons:', pendingCrons);
// //         for (const cronJob of pendingCrons) {
// //             await cronService.processCronJob(cronJob);
// //         }
// //     },
// //     {
// //         scheduled: true,
// //     }
// // );
// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// // });
// // mongoose.set('strictPopulate', false);
// import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import { isCelebrateError } from 'celebrate';
// import cors from 'cors';
// import helmet from 'helmet';
// import { json } from 'body-parser';
// import routes from './api/routes';
// import errorHandler from './middlewares/validation/errorHandler';
// import dbConnector from './config/database';
// import cron from 'node-cron';
// import { closeFtpConnection, connectFtp, downloadFile } from './services/connector/ftpConnector';
// import path from 'path';
// import os from 'os';
// import mongoose from 'mongoose';
// import cronService from './services/cronService/cronService';
// const app = express();
// dotenv.config();
// // const port = process.env.PORT;
// app.use(json({ limit: '50mb' }));
// app.use(express.json());
// app.use(cors({ origin: true, credentials: true }));
// app.use(helmet());
// dbConnector();
// app.get('/', (req: Request, res: Response) => { res.send('Welcome to Vendor-Management.') });
// app.use('/api/v1', routes);
// app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//     if (isCelebrateError(err)) {
//         return errorHandler(err, req, res, next);
//     }
// });
// cron.schedule('*/1 * * * *',
//         async () => {
//             const pendingCrons = await cronService.getPendingCrons();
//             console.log('Pending crons:', pendingCrons);
//             for (const cronJob of pendingCrons) {
//                 await cronService.processCronJob(cronJob);
//             }
//         },
//         {
//             scheduled: true,
//         }
//     );
//     const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// mongoose.set('strictPopulate', false);
// import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import { isCelebrateError } from 'celebrate';
// import cors from 'cors';
// import helmet from 'helmet';
// import { json } from 'body-parser';
// import routes from './api/routes';
// import errorHandler from './middlewares/validation/errorHandler';
// import dbConnector from './config/database';
// import cron from 'node-cron';
// import mongoose from 'mongoose';
// import cronService from './services/cronService/cronService';
// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;
// app.use(json({ limit: '50mb' }));
// app.use(cors({ origin: true, credentials: true }));
// app.use(helmet());
// dbConnector();
// app.get('/', (req: Request, res: Response) => {
//     res.send('Welcome to Vendor-Management.');
// });
// app.use('/api/v1', routes);
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     if (isCelebrateError(err)) {
//         return errorHandler(err, req, res, next);
//     }
//     console.error(err.stack);
//     res.status(500).json({ message: "Internal Server Error" });
// });
// cron.schedule('*/1 * * * *', async () => {
//     const pendingCrons = await cronService.getPendingCrons();
//     console.log('Pending crons:', pendingCrons);
//     for (const cronJob of pendingCrons) {
//         await cronService.processCronJob(cronJob);
//     }
// }, { scheduled: true });
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// mongoose.set('strictPopulate', false);
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const celebrate_1 = require("celebrate");
const celebrate_2 = require("celebrate");
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const body_parser_1 = require("body-parser");
const routes_1 = tslib_1.__importDefault(require("./api/routes"));
const errorHandler_1 = tslib_1.__importDefault(require("./middlewares/validation/errorHandler"));
const database_1 = tslib_1.__importDefault(require("./config/database"));
const node_cron_1 = tslib_1.__importDefault(require("node-cron"));
const cronService_1 = tslib_1.__importDefault(require("./services/cronService/cronService"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
app.use((0, body_parser_1.json)({ limit: '50mb' }));
app.use(express_1.default.json()); // ⬅️ REQUIRED to parse JSON requests
app.use(express_1.default.urlencoded({ extended: true })); // ⬅️ Ensures form-data is parsed
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, helmet_1.default)());
(0, database_1.default)();
app.get('/', (req, res) => { res.send('Welcome to Vendor-Management.'); });
app.use('/api/v1', routes_1.default);
app.use((0, celebrate_1.errors)()); // Handles Joi validation errors
app.use((err, req, res, next) => {
    if ((0, celebrate_2.isCelebrateError)(err)) {
        return (0, errorHandler_1.default)(err, req, res, next);
    }
});
// cron.schedule('*/15 * * * *',
//     async () => {
//         const pendingCrons = await cronService.getRecentPendingCrons(new Date());
//         console.log('Pending crons:', pendingCrons);
//         for (const cronJob of pendingCrons) {
//             await cronService.processCronJob(cronJob);
//         }
//     },
//     {
//         scheduled: true,
//         // runOnInit: true,
//     }
// );
node_cron_1.default.schedule('*/15 * * * *', async () => {
    const pendingCrons = await cronService_1.default.getPendingCrons();
    console.log('Pending crons:', pendingCrons);
    for (const cronJob of pendingCrons) {
        await cronService_1.default.processCronJob(cronJob);
    }
}, { scheduled: true });
// cron.schedule('* * * * *',    // 1 minute for testing
//     async () => {
//         const pendingCrons = await cronService.getRecentPendingCrons(new Date());
//         console.log('Pending crons:', pendingCrons.map(cron => cron._id));
//         for (const cronJob of pendingCrons) {
//             await cronService.processCronJob(cronJob);
//         }
//     },
//     {
//         scheduled: true,
//         // runOnInit: true,
//     }
// );
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map