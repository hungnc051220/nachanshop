import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {},
});

export default cartSlice.reducer;
