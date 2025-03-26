"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("./enums");
const ftpSchema = new mongoose_1.Schema({
    host: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(enums_1.FTP_STATUS),
        default: enums_1.FTP_STATUS.ACTIVE,
        required: true,
    },
    ftpUser: {
        type: String,
        required: true,
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
}, {
    timestamps: true
});
const Ftp = (0, mongoose_1.model)('Ftp', ftpSchema);
exports.default = Ftp;
