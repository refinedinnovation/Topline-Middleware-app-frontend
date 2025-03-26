"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilteredTasks = exports.GetById = exports.GetAllPaginatedTasks = exports.GetAll = void 0;
const shared_1 = require("@/shared");
const task_1 = require("@/services/task/task");
const GetAll = async (req, res) => {
    const fields = await (0, task_1.getAllTasks)(req?.user);
    return (0, shared_1.ApiResponse)(true, "Tasks Fetched Successfully", fields, 200, res);
};
exports.GetAll = GetAll;
const GetAllPaginatedTasks = async (req, res) => {
    const fields = await (0, task_1.getAllPaginatedTasks)(req?.user, Number(req?.query?.page), Number(req?.query?.limit));
    return (0, shared_1.ApiResponse)(true, "Tasks Fetched Successfully", fields, 200, res);
};
exports.GetAllPaginatedTasks = GetAllPaginatedTasks;
const GetById = async (req, res) => {
    const id = req?.params?._id;
    const task = await (0, task_1.findTaskById)(id);
    if (!task) {
        return (0, shared_1.ApiResponse)(false, "Task not found", null, 404, res);
    }
    if (task?.createdBy?.toString() !== req?.user?.firstName?.toString()) {
        return (0, shared_1.ApiResponse)(false, "You are not authorized to perform this action", null, 403, res);
    }
    return (0, shared_1.ApiResponse)(true, "Task Fetched Successfully", task, 200, res);
};
exports.GetById = GetById;
const GetFilteredTasks = async (req, res) => {
    const { status, dueDate, keyword, page = 1, limit = 10, isSortByStatus = false, isSortByDueDate = false } = req?.query;
    const filter = {
        status,
        dueDate,
        keyword,
        isSortByStatus,
        isSortByDueDate
    };
    const fields = await (0, task_1.filterTasks)(req?.user, Number(page), Number(limit), filter);
    return (0, shared_1.ApiResponse)(true, "Tasks Fetched Successfully", fields, 200, res);
};
exports.GetFilteredTasks = GetFilteredTasks;
//# sourceMappingURL=getTask.js.map