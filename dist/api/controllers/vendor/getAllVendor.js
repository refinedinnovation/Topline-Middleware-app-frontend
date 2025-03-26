"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVendor = void 0;
const shared_1 = require("@/shared");
const vendor_1 = require("@/services/vendor/vendor");
const getAllVendor = async (req, res) => {
    try {
        const allVendors = await (0, vendor_1.getAllVendor)();
        return (0, shared_1.ApiResponse)(true, "All Members GET Successfully", allVendors, 200, res);
    }
    catch (error) {
        console.error("Error fetching all vendors:", error);
        return (0, shared_1.ApiResponse)(false, "Failed to fetch members", null, 500, res);
    }
};
exports.getAllVendor = getAllVendor;
//# sourceMappingURL=getAllVendor.js.map