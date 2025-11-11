'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import orderApi from './features/orderApi';

// Tạo store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(orderApi.middleware),
});

// Type hỗ trợ cho useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
