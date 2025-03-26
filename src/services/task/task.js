"use strict";
// import Task from '@/api/models/task/task';
// import { FilterQueryInput, GetAllPaginatedTasksResponse, GetAllTasksQuery, TaskFilter, TaskInput } from './types';
// import { UserRoles } from '@/api/models/user/enum';
// import { JWTEncryptedData } from '@/api/controllers/authentication/types';
// import { ITask } from '@/api/models/task/type';
// import _ from 'lodash';
// import { IError } from '@/utils/CustomError';
// import { findById } from '../user/user';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createNewTask = exports.filterTasks = exports.updateTask = exports.getAllPaginatedTasks = exports.getAllTasks = exports.findTaskById = void 0;
// // export const findTaskById = async (id: string): Promise<ITask | null> => {
// //     const task = await Task.findById(id).lean();
// //     return task;
// // };
// // export const getAllTasks = async (user: JWTEncryptedData): Promise<ITask[]> => {
// //     const query = {} as GetAllTasksQuery;
// //     if (user?.role === UserRoles.USER) {
// //         query.createdBy = user.id;
// //     }
// //     const tasks = await Task.find(query).lean();
// //     return tasks;
// // }
// // export const getAllPaginatedTasks = async (user: JWTEncryptedData, page: number, limit: number): Promise<GetAllPaginatedTasksResponse> => {
// //     const query = {} as GetAllTasksQuery;
// //     if (user?.role === UserRoles.USER) {
// //         query.createdBy = user.id;
// //     }
// //     const tasks = await Task.find(query).skip((page - 1) * limit).limit(limit).lean();
// //     const total = await Task.countDocuments(query);
// //     return { tasks, total, page, limit };
// // }
// export const findTaskById = async (id: string): Promise<ITask | null> => {
//     const task = await Task.findById(id).lean() as ITask | null;
//     return task;
// };
// export const getAllTasks = async (user: JWTEncryptedData): Promise<ITask[]> => {
//     const query = {} as GetAllTasksQuery;
//     if (user?.role === UserRoles.USER) {
//         query.createdBy = user.id;
//     }
//     const tasks = await Task.find(query).lean() as ITask[];
//     return tasks;
// };
// export const getAllPaginatedTasks = async (
//     user: JWTEncryptedData,
//     page: number,
//     limit: number
// ): Promise<GetAllPaginatedTasksResponse> => {
//     const query = {} as GetAllTasksQuery;
//     if (user?.role === UserRoles.USER) {
//         query.createdBy = user.id;
//     }
//     const tasks = await Task.find(query).skip((page - 1) * limit).limit(limit).lean() as ITask[];
//     const total = await Task.countDocuments(query);
//     return { tasks, total, page, limit };
// };
// export const updateTask = async (
//     id: string,
//     task: TaskInput,
//     user: JWTEncryptedData
// ): Promise<ITask | null> => {
//     const checkTask = await findTaskById(id);
//     if (!checkTask) {
//         throw new IError('Task not found', 404);
//     }
//     // Ensure the user is authorized to update the task or the task belongs to the user
//     if (user?.id?.toString() !== checkTask?.createdBy?.toString()) {
//         throw new IError('You are not authorized to perform this action', 403);
//     }
//     const updatedTask = await Task.findByIdAndUpdate(id, { ...task }, { new: true }).lean() as ITask | null;
//     return updatedTask;
// };
// export const filterTasks = async (
//     user: JWTEncryptedData,
//     page: number,
//     limit: number,
//     filter: TaskFilter
// ): Promise<GetAllPaginatedTasksResponse> => {
//     const query = {} as FilterQueryInput;
//     if (user?.role === UserRoles.USER) {
//         query.createdBy = user?.id;
//     }
//     if (!_?.isEmpty(filter.status)) {
//         query.status = filter?.status;
//     }
//     if (!_?.isEmpty(filter.dueDate)) {
//         query.dueDate = filter?.dueDate;
//     }
//     if (!_?.isEmpty(filter.keyword)) {
//         query.$or = [
//             { title: { $regex: new RegExp(filter?.keyword as string, 'i') } },
//             { description: { $regex: new RegExp(filter?.keyword as string, 'i') } }
//         ];
//     }
//     let sortOptions = {};
//     if (filter?.isSortByStatus) {
//         sortOptions = { ...sortOptions, status: 1 };
//     }
//     if (filter?.isSortByDueDate) {
//         sortOptions = { ...sortOptions, dueDate: 1 };
//     }
//     const tasks = await Task.find(query).sort(sortOptions).skip((page - 1) * limit).limit(limit).lean() as ITask[];
//     const total = await Task.countDocuments(query);
//     return { tasks, total, page, limit };
// };
// export const createNewTask = async (task: TaskInput, user: JWTEncryptedData): Promise<ITask> => {
//     const checkUser = await findById(user?.id);
//     if (!checkUser) {
//         throw new IError('User not found', 404);
//     }
//     task.createdBy = user?.id;
//     const newTask = new Task({ ...task });
//     return await newTask.save();
// };
// export const updateTask = async (id: string, task: TaskInput, user: JWTEncryptedData): Promise<ITask | null> => {
//     const checkTask = await findTaskById(id);
//     if (!checkTask) {
//         throw new IError('Task not found', 404);
//     }
//     // make sure the user is authorized to update the task, or this task belongs to the user
//     if (user?.id?.toString() !== checkTask?.createdBy?.toString()) {
//         throw new IError('You are not authorized to perform this action', 403);
//     }
//     const updatedTask = await Task.findByIdAndUpdate(id, { ...task }, { new: true });
//     return updatedTask;
// };
// export const deleteTask = async (id: string, user: JWTEncryptedData): Promise<ITask | null> => {
//     const checkTask = await findTaskById(id);
//     if (!checkTask) {
//         throw new IError('Task not found', 404);
//     }
//     // make sure the user is authorized to update the task, or this task belongs to the user
//     if (user?.id?.toString() !== checkTask?.createdBy?.toString()) {
//         throw new IError('You are not authorized to perform this action', 403);
//     }
//     await Task.findByIdAndDelete(id);
//     return checkTask;
// }
// export const filterTasks = async (user: JWTEncryptedData, page: number, limit: number, filter: TaskFilter,): Promise<GetAllPaginatedTasksResponse> => {
//     const query = {} as FilterQueryInput;
//     if (user?.role === UserRoles.USER) {
//         query.createdBy = user?.id;
//     }
//     if (!_?.isEmpty(filter.status)) {
//         query.status = filter?.status;
//     }
//     if (!_?.isEmpty(filter.dueDate)) {
//         query.dueDate = filter?.dueDate;
//     }
//     if (!_?.isEmpty(filter.keyword)) {
//         query.$or = [
//             { title: { $regex: new RegExp(filter?.keyword as string, 'i') } },
//             { description: { $regex: new RegExp(filter?.keyword as string, 'i') } }
//         ];
//     }
//     let sortOptions = {};
//     if (filter?.isSortByStatus) {
//         sortOptions = { ...sortOptions, status: 1 };
//     }
//     if (filter?.isSortByDueDate) {
//         sortOptions = { ...sortOptions, dueDate: 1 };
//     }
//     const tasks = await Task.find(query).sort(sortOptions).skip((page - 1) * limit).limit(limit).lean();
//     const total = await Task.countDocuments(query);
//     return { tasks, total, page, limit };
// }
const task_1 = __importDefault(require("@/api/models/task/task"));
const enum_1 = require("@/api/models/user/enum");
const lodash_1 = __importDefault(require("lodash"));
const CustomError_1 = require("@/utils/CustomError");
const user_1 = require("../user/user");
// Find a task by ID
const findTaskById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.default.findById(_id).lean();
    return task;
});
exports.findTaskById = findTaskById;
// Get all tasks for a user
const getAllTasks = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) === enum_1.UserRoles.USER) {
        query.createdBy = user.firstName;
    }
    const tasks = yield task_1.default.find(query).lean();
    return tasks;
});
exports.getAllTasks = getAllTasks;
// Get paginated tasks
const getAllPaginatedTasks = (user, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) === enum_1.UserRoles.USER) {
        query.createdBy = user.firstName;
    }
    const tasks = yield task_1.default.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
    const total = yield task_1.default.countDocuments(query);
    return { tasks, total, page, limit };
});
exports.getAllPaginatedTasks = getAllPaginatedTasks;
// Update a task
const updateTask = (id, task, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const checkTask = yield (0, exports.findTaskById)(id);
    if (!checkTask) {
        throw new CustomError_1.IError('Task not found', 404);
    }
    // Ensure the user is authorized to update the task or the task belongs to the user
    if (((_a = user === null || user === void 0 ? void 0 : user.firstName) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = checkTask === null || checkTask === void 0 ? void 0 : checkTask.createdBy) === null || _b === void 0 ? void 0 : _b.toString())) {
        throw new CustomError_1.IError('You are not authorized to perform this action', 403);
    }
    const updatedTask = yield task_1.default.findByIdAndUpdate(id, Object.assign({}, task), { new: true }).lean();
    return updatedTask;
});
exports.updateTask = updateTask;
// Filter tasks
const filterTasks = (user, page, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) === enum_1.UserRoles.USER) {
        query.createdBy = user === null || user === void 0 ? void 0 : user.firstName;
    }
    if (!(lodash_1.default === null || lodash_1.default === void 0 ? void 0 : lodash_1.default.isEmpty(filter.status))) {
        query.status = filter === null || filter === void 0 ? void 0 : filter.status;
    }
    if (!(lodash_1.default === null || lodash_1.default === void 0 ? void 0 : lodash_1.default.isEmpty(filter.dueDate))) {
        query.dueDate = filter === null || filter === void 0 ? void 0 : filter.dueDate;
    }
    if (!(lodash_1.default === null || lodash_1.default === void 0 ? void 0 : lodash_1.default.isEmpty(filter.keyword))) {
        query.$or = [
            { title: { $regex: new RegExp(filter === null || filter === void 0 ? void 0 : filter.keyword, 'i') } },
            { description: { $regex: new RegExp(filter === null || filter === void 0 ? void 0 : filter.keyword, 'i') } }
        ];
    }
    let sortOptions = {};
    if (filter === null || filter === void 0 ? void 0 : filter.isSortByStatus) {
        sortOptions = Object.assign(Object.assign({}, sortOptions), { status: 1 });
    }
    if (filter === null || filter === void 0 ? void 0 : filter.isSortByDueDate) {
        sortOptions = Object.assign(Object.assign({}, sortOptions), { dueDate: 1 });
    }
    const tasks = yield task_1.default.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
    const total = yield task_1.default.countDocuments(query);
    return { tasks, total, page, limit };
});
exports.filterTasks = filterTasks;
// Create a new task
const createNewTask = (task, user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield (0, user_1.findById)(user === null || user === void 0 ? void 0 : user.firstName);
    if (!checkUser) {
        throw new CustomError_1.IError('User not found', 404);
    }
    task.createdBy = user === null || user === void 0 ? void 0 : user.firstName;
    const newTask = new task_1.default(Object.assign({}, task));
    return yield newTask.save();
});
exports.createNewTask = createNewTask;
// Delete a task
const deleteTask = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const checkTask = yield (0, exports.findTaskById)(id);
    if (!checkTask) {
        throw new CustomError_1.IError('Task not found', 404);
    }
    // Ensure the user is authorized to delete the task
    if (((_a = user === null || user === void 0 ? void 0 : user.firstName) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = checkTask === null || checkTask === void 0 ? void 0 : checkTask.createdBy) === null || _b === void 0 ? void 0 : _b.toString())) {
        throw new CustomError_1.IError('You are not authorized to perform this action', 403);
    }
    yield task_1.default.findByIdAndDelete(id);
    return checkTask;
});
exports.deleteTask = deleteTask;
