import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';
dotenv.config();


const port = process.env.PORT || 5000;
connectDB();


app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`)
});
