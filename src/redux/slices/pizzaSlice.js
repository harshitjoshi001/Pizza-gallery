import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const pizzaSLice = createSlice({
  name: "pizzaStore",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    cancelOrder: (state, action) => {
      state.orders = action.payload;
    },
    changeStage: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { placeOrder, cancelOrder, changeStage } = pizzaSLice.actions;

export default pizzaSLice.reducer;
