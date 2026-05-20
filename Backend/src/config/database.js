import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI2 ||process.env.MONGO_URI);
        console.log("Kết nối thành công :))");
        

    } catch (error) {
        console.log('Kết nối thất bại', error.message);
        process.exit(1);
    }
}

export default connectDB;