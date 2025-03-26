"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1=require("cors")
const validators_1 = require("../../validators");
const celebrate_1 = require("celebrate");
const utils_1 = require("@/utils");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/login', (0, celebrate_1.celebrate)(validators_1.loginWithCredentials),(cors_1.loginWithCredentials) (0, utils_1.AsyncWrapper)(controllers_1.loginWithCredentials));
router.post('/registration', (0, celebrate_1.celebrate)(validators_1.UserInput), (0, utils_1.AsyncWrapper)(controllers_1.RegistrationHandler));
exports.default = router;
// ##sourceMappingURL=auth.js.map