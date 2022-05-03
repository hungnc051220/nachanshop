import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
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
      localStorage.removeItem("cartItems");
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        existItem.quantity = existItem.quantity + item.quantity;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      toast.success("Đã thêm vào giỏ hàng", {
        id: "addToCart",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
      toast.success("Đã xoá khỏi giỏ hàng", {
        id: "removeFromCart",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((x) => x._id === itemId);
      state.cartItems[itemIndex].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((x) => x._id === itemId);
      state.cartItems[itemIndex].quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    calculateTotals: (state) => {
      state.total = state.cartItems.reduce(
        (price, item) => item.price * item.quantity + price,
        0
      );
    },
  },
});

export const {
  clearCart,
  addToCart,
  removeFromCart,
  increaseCart,
  decreaseCart,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
