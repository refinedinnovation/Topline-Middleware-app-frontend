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

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { errors } from "celebrate";
import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import routes from './api/routes';
import errorHandler from './middlewares/validation/errorHandler';
import dbConnector from './config/database';
import cron from 'node-cron';
import { closeFtpConnection, connectFtp, downloadFile } from './services/connector/ftpConnector';
import path from 'path';
import os from 'os';
import cronService from './services/cronService/cronService';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(json({ limit: '50mb' }));

app.use(express.json());  // ⬅️ REQUIRED to parse JSON requests
app.use(express.urlencoded({ extended: true }));  // ⬅️ Ensures form-data is parsed
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use(helmet());

dbConnector();

app.get('/', (req: Request, res: Response) => { res.send('Welcome to Vendor-Management.') });

app.use('/api/v1', routes);
app.use(errors()); // Handles Joi validation errors
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
        return errorHandler(err, req, res, next);
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
cron.schedule('*/15 * * * *', async () => {
    const pendingCrons = await cronService.getPendingCrons();
    console.log('Pending crons:', pendingCrons);
    for (const cronJob of pendingCrons) {
        await cronService.processCronJob(cronJob);
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