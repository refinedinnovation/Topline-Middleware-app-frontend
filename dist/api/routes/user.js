"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const utils_1 = require("@/utils");
const user_1 = require("../controllers/user");
const validators_1 = require("@/validators");
const common_1 = require("@/validators/common");
const router = (0, express_1.Router)();
router.post('/create', (0, celebrate_1.celebrate)(validators_1.AddNewUser), (0, utils_1.AsyncWrapper)(user_1.AddUser));
router.get('/getAll', (0, utils_1.AsyncWrapper)(user_1.GetAllUser));
router.put('/update/:email', (0, celebrate_1.celebrate)(common_1.verifyEmailOnly), (0, celebrate_1.celebrate)(validators_1.AddNewUser), (0, utils_1.AsyncWrapper)(user_1.UpdateUser));
router.delete('/delete/:email', (0, celebrate_1.celebrate)(common_1.verifyEmailOnly), (0, utils_1.AsyncWrapper)(user_1.Delete));
exports.default = router;
//# sourceMappingURL=user.js.map