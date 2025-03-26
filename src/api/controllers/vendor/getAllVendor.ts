import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { getAllVendor as fetchAllVendors } from "@/services/vendor/vendor";

export const getAllVendor = async (req: Request, res: Response) => {
    try {
        const allVendors = await fetchAllVendors();
        return ApiResponse(
            true,
            "All Members GET Successfully",
            allVendors,
            200,
            res
        );
    } catch (error) {
        console.error("Error fetching all vendors:", error);
        return ApiResponse(
            false,
            "Failed to fetch members",
            null,
            500,
            res
        );
    }
};
