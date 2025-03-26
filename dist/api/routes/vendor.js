"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const utils_1 = require("@/utils");
const user_1 = require("../controllers/user");
const common_1 = require("@/validators/common");
const getAllVendor_1 = require("../controllers/vendor/getAllVendor");
const addVendor_1 = require("../controllers/vendor/addVendor");
const updateVendor_1 = require("../controllers/vendor/updateVendor");
// import { DisableUser } from '../controllers/vendor/disableVendor';
const router = (0, express_1.Router)();
router.post('/create', (0, utils_1.AsyncWrapper)(addVendor_1.AddVendor));
router.get('/getAll', (0, utils_1.AsyncWrapper)(getAllVendor_1.getAllVendor));
router.put('/update/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, utils_1.AsyncWrapper)(updateVendor_1.UpdateUser));
router.delete('/delete/:id', (0, celebrate_1.celebrate)(common_1.verifyMongooseId), (0, utils_1.AsyncWrapper)(user_1.Delete));
// router.put('/disable/:id', celebrate(verifyMongooseId), AsyncWrapper(DisableUser))
exports.default = router;
//# sourceMappingURL=vendor.js.map