import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ["Content-Type","Authorization"],
}));
app.use(morgan("dev"));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order',orderRoutes)
export default app;