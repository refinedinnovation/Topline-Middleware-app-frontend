"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilteredTasks = exports.GetById = exports.GetAllPaginatedTasks = exports.GetAll = void 0;
const shared_1 = require("@/shared");
const task_1 = require("@/services/task/task");
const GetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = yield (0, task_1.getAllTasks)(req === null || req === void 0 ? void 0 : req.user);
    return (0, shared_1.ApiResponse)(true, "Tasks Fetched Successfully", fields, 200, res);
});
exports.GetAll = GetAll;
const GetAllPaginatedTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const fields = yield (0, task_1.getAllPaginatedTasks)(req === null || req === void 0 ? void 0 : req.user, Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page), Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit));
    return (0, shared_1.ApiResponse)(true, "Tasks Fetched Successfully", fields, 200, res);
});
exports.GetAllPaginatedTasks = GetAllPaginatedTasks;
const GetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a._id;
    const task = yield (0, task_1.findTaskById)(id);
    if (!task) {
        return (0, shared_1.ApiResponse)(false, "Task not found", null, 404, res);
    }
    if (((_b = task === null || task === void 0 ? void 0 : task.createdBy) === null || _b === void 0 ? void 0 : _b.toString()) !== ((_d = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.firstName) === null || _d === void 0 ? void 0 : _d.toString())) {
        return (0, shared_1.ApiResponse)(false, "You are not authorized to perform this action", null, 403, res);
    }
    return (0, shared_1.ApiResponse)(true, "Task Fetched Successfully", task, 200, res);
});
exports.GetById = GetById;
const GetFilteredTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, dueDate, keyword, page = 1, limit = 10, isSortByStatus = false, isSortByDueDate = false } = req === null || req === void 0 ? void 0 : req.query;
    const filter = {
        status,
        dueDate,
        keyword,
        isSortByStatus,
        isSortByDueDate
    };
    const fields = yield (0, task_1.filterTasks)(req === null || req === void 0 ? void 0 : req.user, Number(page), Number(limit), filter);
    return (0, shared_1.ApiResponse)(true, "Tasks Fetched Successfully", fields, 200, res);
});
exports.GetFilteredTasks = GetFilteredTasks;
