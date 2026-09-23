'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import ordersApi from './features/ordersApi';
import productApi from './features/productApi';
import reviewApi  from './features/reviewsApi';
import contactApi from './features/contactApi';
import newsApi from './features/newsApi';
import uploadApi from './features/uploadApi';
import type { RootState, AppDispatch } from '#/types';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(ordersApi.middleware,productApi.middleware,reviewApi.middleware,contactApi.middleware,newsApi.middleware,uploadApi.middleware),
});

export type { RootState, AppDispatch };
