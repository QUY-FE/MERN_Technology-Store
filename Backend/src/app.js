import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'; 
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from './routes/review.routes.js';
import contactRoutes from './routes/contact.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import newsRoutes from './routes/news.routes.js';
const app = express();

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


const allOrigin = [
    'https://qn-technology-store.vercel.app',
    'http://localhost:3000',
]

app.use(express.json());
app.use(cors({
    origin: allOrigin,
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ["Content-Type","Authorization"],
}));
app.use(morgan("dev"));
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders',orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/news', newsRoutes)

export default app;