// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const dotenv_1 = __importDefault(require("dotenv"));
// const celebrate_1 = require("celebrate");
// const cors_1 = __importDefault(require("cors"));
// const helmet_1 = __importDefault(require("helmet"));
// const body_parser_1 = require("body-parser");
// const routes_1 = __importDefault(require("./api/routes"));
// const errorHandler_1 = __importDefault(require("./middlewares/validation/errorHandler"));
// const database_1 = __importDefault(require("./config/database"));
// const node_cron_1 = __importDefault(require("node-cron"));
// const mongoose_1 = __importDefault(require("mongoose"));
// const cronService_1 = __importDefault(require("./services/cronService/cronService"));
// const app = (0, express_1.default)();
// dotenv_1.default.config();
// const port = "http://localhost:3000/";
// app.use((0, body_parser_1.json)({ limit: '50mb' }));
// app.use(express_1.default.json());
// app.use((0, cors_1.default)({ origin: true, credentials: true }));
// app.use((0, helmet_1.default)());
// (0, database_1.default)();
// app.get('/', (req, res) => { res.send('Welcome to Vendor-Management.'); });
// app.use('/api/v1', routes_1.default);
// app.use((err, req, res, next) => {
//     if ((0, celebrate_1.isCelebrateError)(err)) {
//         return (0, errorHandler_1.default)(err, req, res, next);
//     }
// });
// node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
//     const pendingCrons = yield cronService_1.default.getPendingCrons();
//     console.log('Pending crons:', pendingCrons);
//     for (const cronJob of pendingCrons) {
//         yield cronService_1.default.processCronJob(cronJob);
//     }
// }), {
//     scheduled: true,
// });
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// mongoose_1.default.set('strictPopulate', false);
"use strict";
const express = require("express");
const dotenv = require("dotenv");
const { isCelebrateError } = require("celebrate");
const cors = require("cors");
const helmet = require("helmet");
const { json } = require("body-parser");
const routes = require("./api/routes");
const errorHandler = require("./middlewares/validation/errorHandler");
const dbConnector = require("./config/database");
const cron = require("node-cron");
const mongoose = require("mongoose");
const cronService = require("./services/cronService/cronService");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json({ limit: "50mb" }));
app.use(cors({
    origin: "http://localhost:3000", // Change this to your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(helmet());
app.options("*", cors()); // Allow preflight requests
app.use(cors());

dbConnector();

app.get("/", (req, res) => {
    res.send("Welcome to Vendor-Management.");
});

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    if (isCelebrateError(err)) {
        return errorHandler(err, req, res, next);
    }
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

cron.schedule(
    "*/1 * * * *",
    async () => {
        const pendingCrons = await cronService.getPendingCrons();
        console.log("Pending crons:", pendingCrons);
        for (const cronJob of pendingCrons) {
            await cronService.processCronJob(cronJob);
        }
    },
    { scheduled: true }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.set("strictPopulate", false);
