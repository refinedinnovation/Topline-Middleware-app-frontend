"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithCredentials = void 0;
const shared_1 = require("@/shared");
const user_1 = require("@/services/user/user");
const token_1 = require("./token");
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
const loginWithCredentials = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Ensure email and password are provided
        if (!email || !password) {
            return (0, shared_1.ApiResponse)(false, "Email and password are required", null, 400, res);
        }
        // Attempt login
        const loginUser = await (0, user_1.loginWithEmail)(email, password);
        if (!loginUser) {
            return (0, shared_1.ApiResponse)(false, "Invalid credentials", null, 401, res);
        }
        // Generate JWT token
        const jwtData = {
            _id: loginUser._id,
            email: loginUser.email,
            firstName: loginUser.firstName,
            lastName: loginUser.lastName,
            companyName: loginUser.companyName,
            companyAddress: loginUser.companyAddress,
            contactNumber: loginUser.contactNumber,
            role: loginUser.role,
        };
        const token = (0, token_1.GenerateJwtToken)(jwtData);
        return (0, shared_1.ApiResponse)(true, "Login successful", { email, token }, 200, res);
    }
    catch (error) {
        console.error("Login error:", error);
        return (0, shared_1.ApiResponse)(false, "Internal Server Error", null, 500, res);
    }
};
exports.loginWithCredentials = loginWithCredentials;
//# sourceMappingURL=login.js.map