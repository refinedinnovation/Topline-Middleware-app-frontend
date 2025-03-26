"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const shared_1 = require("@/shared");
const task_1 = require("@/services/task/task");
const Delete = async (req, res) => {
    const id = req?.params?._id;
    const DeletedTask = await (0, task_1.deleteTask)(id, req?.user);
    return (0, shared_1.ApiResponse)(true, "User Deleted Successfully", DeletedTask, 201, res);
};
exports.Delete = Delete;
//# sourceMappingURL=deleteTask.js.map