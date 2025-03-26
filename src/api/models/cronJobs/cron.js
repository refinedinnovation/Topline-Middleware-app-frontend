"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("./enums");
const cronSchema = new mongoose_1.Schema({
    ftp: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ftp',
        required: true,
    },
    operations: [{
            type: String,
            required: true,
            trim: true,
        }],
    schedule: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: Object.values(enums_1.CronStatus),
        default: enums_1.CronStatus.PENDING,
        required: true,
    },
    lastRun: {
        type: Date,
    },
    nextRun: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
const Cron = (0, mongoose_1.model)('Cron', cronSchema);
exports.default = Cron;
