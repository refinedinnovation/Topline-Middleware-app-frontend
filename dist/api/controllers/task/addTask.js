"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTask = void 0;
const shared_1 = require("@/shared");
const task_1 = require("@/services/task/task");
const AddTask = async (req, res) => {
    const task = req.body;
    const addNewUser = await (0, task_1.createNewTask)(task, req?.user);
    return (0, shared_1.ApiResponse)(true, "New Task Added Successfully", addNewUser, 201, res);
};
exports.AddTask = AddTask;
//# sourceMappingURL=addTask.js.map