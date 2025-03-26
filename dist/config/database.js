"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import User from '@/api/models/user/user';
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
// if (mongoose.Types.ObjectId.isValid(userId)) {
//   User.findOne({ _id: new mongoose.Types.ObjectId(userId) })
//     .then(user => console.log(user))
//     .catch(err => console.error(err));
// } else {
//   console.error("Invalid ObjectId format");
// }
const dbConnector = async () => {
    try {
        console.log('Connecting to Mongo DB......');
        await mongoose_1.default.connect(process?.env?.MONGO_URI, {
        // We can add more option here if we needed
        });
        console.log('Connected to Mongo DB');
    }
    catch (error) {
        console.log(error?.message);
        console.log('Database connection failed');
    }
};
exports.default = dbConnector;
//# sourceMappingURL=database.js.map