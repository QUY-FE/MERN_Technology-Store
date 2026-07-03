import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI2 ||process.env.MONGO_URI);
        console.log("*Kết nối cơ sở dữ liệu thành công ✓");
        

    } catch (error) {
        console.log('!Kết nối cơ sở dữ liệu thất bại ☒', error.message);
        process.exit(1);
    }
}

export default connectDB;