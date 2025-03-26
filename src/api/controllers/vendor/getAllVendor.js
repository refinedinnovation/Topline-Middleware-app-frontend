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
exports.getAllVendor = void 0;
const shared_1 = require("@/shared");
const vendor_1 = require("@/services/vendor/vendor");
const getAllVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allVendors = yield (0, vendor_1.getAllVendor)();
        return (0, shared_1.ApiResponse)(true, "All Members GET Successfully", allVendors, 200, res);
    }
    catch (error) {
        console.error("Error fetching all vendors:", error);
        return (0, shared_1.ApiResponse)(false, "Failed to fetch members", null, 500, res);
    }
});
exports.getAllVendor = getAllVendor;
