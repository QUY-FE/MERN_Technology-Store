import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
const app = express();


const allOrigin = [
    'https://qn-technology-store.vercel.app',
    'http://localhost:3000',
]

app.use(express.json());
app.use(cors({
    origin: allOrigin,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ["Content-Type","Authorization"],
}));
app.use(morgan("dev"));

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders',orderRoutes)
export default app;