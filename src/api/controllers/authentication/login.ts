import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { JWTEncryptedData, Login } from "./types";
import { loginWithEmail } from "@/services/user/user";
import { GenerateJwtToken } from "./token";

// export const loginWithCredentials = async (req: Request, res: Response) => {
//     const { email, password } = req?.body as Login;
//     const loginUser = await loginWithEmail(email, password);
//     const jwtData: JWTEncryptedData = {
//         _id: loginUser._id ,
//         email: loginUser.email,
//         firstName: loginUser.firstName,
//         lastName: loginUser.lastName,
//         companyName: loginUser.companyName,
//         companyAddress: loginUser.companyAddress,
//         contactNumber: loginUser.contactNumber,
//         role: loginUser.role,
//         // userName: loginUser.userName
//     }
//     const token = GenerateJwtToken(jwtData);
//     return ApiResponse(true, "Login successful", { email, token }, 200, res);
// };

export const loginWithCredentials = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as Login;

        // Ensure email and password are provided
        if (!email || !password) {
            return ApiResponse(false, "Email and password are required", null, 400, res);
        }

        // Attempt login
        const loginUser = await loginWithEmail(email, password);
        if (!loginUser) {
            return ApiResponse(false, "Invalid credentials", null, 401, res);
        }

        // Generate JWT token
        const jwtData: JWTEncryptedData = {
            _id: loginUser._id,
            email: loginUser.email,
            firstName: loginUser.firstName,
            lastName: loginUser.lastName,
            companyName: loginUser.companyName,
            companyAddress: loginUser.companyAddress,
            contactNumber: loginUser.contactNumber,
            role: loginUser.role,
        };
        const token = GenerateJwtToken(jwtData);

        return ApiResponse(true, "Login successful", { email, token }, 200, res);
    } catch (error) {
        console.error("Login error:", error);
        return ApiResponse(false, "Internal Server Error", null, 500, res);
    }
};

