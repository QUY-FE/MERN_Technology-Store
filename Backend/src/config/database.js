import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.MONGO_URI2;
        await mongoose.connect(uri);
        console.log("*Kết nối cơ sở dữ liệu thành công ✓");
        

    } catch (error) {
        console.log('!Kết nối cơ sở dữ liệu thất bại ☒', error.message);
        process.exit(1);
    }
}

export default connectDB;