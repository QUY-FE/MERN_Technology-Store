'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import ordersApi from './features/ordersApi';
import productApi from './features/productApi';

// Tạo store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(ordersApi.middleware,productApi.middleware),
});

// Type hỗ trợ cho useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
