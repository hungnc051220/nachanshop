import { createSlice } from "@reduxjs/toolkit";

const cartFromLocal = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartFromLocal,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        existItem.quantity = existItem.quantity + item.quantity;
      } else {
        state.cartItems = { ...state.cartItems, item };
      }
    },
    calculateTotals: (state) => {
      state.total = cartItems.reduce(
        (price, item) => item.price * item.quantity + price,
        0
      );
    },
  },
});

export const { clearCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
