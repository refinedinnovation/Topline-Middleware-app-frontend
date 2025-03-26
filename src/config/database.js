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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import User from '@/api/models/user/user';
const mongoose_1 = __importDefault(require("mongoose"));
// if (mongoose.Types.ObjectId.isValid(userId)) {
//   User.findOne({ _id: new mongoose.Types.ObjectId(userId) })
//     .then(user => console.log(user))
//     .catch(err => console.error(err));
// } else {
//   console.error("Invalid ObjectId format");
// }
const dbConnector = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Connecting to Mongo DB......');
        yield mongoose_1.default.connect((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URI, {
        // We can add more option here if we needed
        });
        console.log('Connected to Mongo DB');
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.message);
        console.log('Database connection failed');
    }
});
exports.default = dbConnector;
