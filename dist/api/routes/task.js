"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const utils_1 = require("@/utils");
const task_1 = require("../controllers/task");
const common_1 = require("@/validators/common");
const task_2 = require("@/validators/task");
const router = (0, express_1.Router)();
router.post('/create', (0, celebrate_1.celebrate)(task_2.TaskInput), (0, utils_1.AsyncWrapper)(task_1.AddTask));
router.get('/getAll', (0, utils_1.AsyncWrapper)(task_1.GetAll));
router.get('/getFilteredTasks', (0, utils_1.AsyncWrapper)(task_1.GetFilteredTasks));
router.get('/getAllPaginatedTasks', (0, utils_1.AsyncWrapper)(task_1.GetAllPaginatedTasks));
router.get('/getTaskById/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, utils_1.AsyncWrapper)(task_1.GetById));
router.put('/update/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, celebrate_1.celebrate)(task_2.UpdateTaskValidation), (0, utils_1.AsyncWrapper)(task_1.UpdateTask));
router.delete('/delete/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, utils_1.AsyncWrapper)(task_1.Delete));
exports.default = router;
//# sourceMappingURL=task.js.map