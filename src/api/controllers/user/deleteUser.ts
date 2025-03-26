import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { deleteUser } from "@/services/user/user";

export const Delete = async (req: Request, res: Response) => {
    const email = req?.params?.email as string;
    const DeletedUser = await deleteUser(email);
    return ApiResponse(true, "User Deleted Successfully", DeletedUser, 201, res);
 }; 