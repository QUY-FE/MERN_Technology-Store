import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';


const port = process.env.PORT || 5000;
connectDB();
dotenv.config();


app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`)
});
