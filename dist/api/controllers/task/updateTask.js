"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
const shared_1 = require("@/shared");
const task_1 = require("@/services/task/task");
const UpdateTask = async (req, res) => {
    const id = req?.params?._id;
    const task = req?.body;
    const updatedUser = await (0, task_1.updateTask)(id, task, req?.user);
    return (0, shared_1.ApiResponse)(true, "Task Updated Successfully", updatedUser, 201, res);
};
exports.UpdateTask = UpdateTask;
//# sourceMappingURL=updateTask.js.map