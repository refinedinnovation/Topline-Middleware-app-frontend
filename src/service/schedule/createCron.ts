// // import { post } from "../axiosWrapper";
// // import { routes } from "../routes";

// // export const createCron = async (data: any) => {
// //     console.log("createCron F",data);
// //     return await post(routes?.dashboard?.schedule?.createCronJob, data);
// // }
// import { post } from "../axiosWrapper";
// import { routes } from "../routes";
// import { APIResponse } from "../types";

// export const createCron = async (data: any): Promise<APIResponse> => {
//   return await post(routes.dashboard.schedule.createCronJob, data);
// };
import api, { post } from "../axiosWrapper";
import { routes } from "../routes";
import axios from "axios";
 import { APIResponse } from "../types";

// export const createCron = async (data: any) => {
//   return await post(routes.dashboard.schedule.createCronJob, data);
// };

// export const createCronJob = async (data: { ftpId: string; operations: string; schedule: string; }) => {
//     try {
//         const response = await api.post('/cron/create', data);
//         return response.data;
//     } catch (error) {
//         console.error("Error creating cron job", error);
//         throw error;
//     }
// };
export const createCronJob = async (data: { ftpId: string; operations: string[]; schedule: string }) => {
  try {
    if (!data.ftpId || typeof data.ftpId !== "string") {
      console.error("❌ Invalid ftpId:", data.ftpId);
      throw new Error("ftpId must be a valid string.");
    }

    console.log("📤 Sending Cron Job Data:", data);

    const response = await axios.post(`http://localhost:4041/api/v1/cron/create`, data);
    console.log("✅ Cron Job Created:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating cron job:", error.response?.data || error.message);
    throw error;
  }
};




export const executeCron = async (cronJobId: string): Promise<APIResponse> => {
  try {
    const response = await post(routes.dashboard.schedule.executeCronJob, { cronJobId });

    if (!response || typeof response !== "object") {
      throw new Error("Invalid response from server");
    }

    return response;
  } catch (error) {
    console.error("Error executing cron job:", error);
    throw error;
  }
};
