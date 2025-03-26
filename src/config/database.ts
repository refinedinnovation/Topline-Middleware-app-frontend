// import User from '@/api/models/user/user';
import mongoose from 'mongoose';



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
        await mongoose.connect(process?.env?.MONGO_URI as string, {
            // We can add more option here if we needed
        });
        console.log('Connected to Mongo DB');
    } catch (error) {
        console.log(error?.message);
        console.log('Database connection failed');
    }
}

export default dbConnector;  