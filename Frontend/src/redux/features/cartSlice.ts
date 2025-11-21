import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// SỬA 1: Ép kiểu Number() ở đây để đảm bảo luôn tính toán ra số
const calculateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + Number(item.quantity), 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state));
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cart');
    },

    loadCartFromStorage: (state) => {
      if (typeof window === 'undefined') return; // Check window để tránh lỗi SSR
      
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // SỬA 2: Kiểm tra kỹ dữ liệu từ LocalStorage
        state.items = parsed.items || [];
        // Ép kiểu Number() ngay khi load lên để tránh "rác" từ quá khứ
        state.totalPrice = Number(parsed.totalPrice) || 0; 
        state.totalQuantity = Number(parsed.totalQuantity) || 0;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;