"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("./enum");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: Object.values(enum_1.TaskStatus),
        default: enum_1.TaskStatus.PENDING,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
//# sourceMappingURL=task.js.map