"use strict";
// import { ApiResponse } from "@/shared";
// import { Response } from "express";
// // import { disableUser } from "@/services/user/user";
// import { UserRoles } from "@/api/models/user/enum";
// import { VendorInput } from "./types";
// import { bulkUpdate } from "@/services/ftp/ftp";
// import { UserInput } from "@/services/user/types";
// import { AuthenticatedRequest } from "@/middlewares/types";
// export const DisableUser = async (req: AuthenticatedRequest, res: Response) => {
//    const id = req?.params?.id as string;
//    const user = req?.body as VendorInput;
//    req.body.role = UserRoles.VENDOR;
//    const userToDisable = {
//       userName:req?.body?.userName,
//       email:req?.body?.email,
//       firstName:req?.body?.firstName,
//       lastName:req?.body.firstName,
//       companyName:req?.body.companyName,
//       companyAddress:req?.body.companyAddress,
//       contactNumber:req?.body.contactNumber,
//       role:req?.body?.role,
//       password:'12345678'
//    } as UserInput
//    const DisableUser = await disableUser(id, userToDisable);
//    const disableFTP = await bulkUpdate(user?.ftps, DisableUser?.id as string, req?.user?.id as string)
//    return ApiResponse(true, "Member Disabled Successfully", {disableUser, disableFTP}, 201, res);
// }; 
