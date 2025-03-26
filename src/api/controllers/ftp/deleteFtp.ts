import { ApiResponse } from "@/shared";
import { Response } from "express";
import _ from "lodash";
import { deleteFtp } from "@/services/ftp/ftp";
import { AuthenticatedRequest } from "@/middlewares/types";

export const DeleteFtp = async (req: AuthenticatedRequest, res: Response) => {
    const { _id } = req.params;
    const deletedFtp = await deleteFtp(_id);
    return ApiResponse(true, "Ftp Deleted Successfully", deletedFtp, 200, res);
}; 