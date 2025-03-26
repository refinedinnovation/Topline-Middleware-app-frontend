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
exports.AddTask = void 0;
const shared_1 = require("@/shared");
const task_1 = require("@/services/task/task");
const AddTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body;
    const addNewUser = yield (0, task_1.createNewTask)(task, req === null || req === void 0 ? void 0 : req.user);
    return (0, shared_1.ApiResponse)(true, "New Task Added Successfully", addNewUser, 201, res);
});
exports.AddTask = AddTask;
