import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  pickedOrders: [],
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
    setPickedOrders: (state, action) => {
      state.pickedOrders = [...state.pickedOrders, action.payload];
    },
  },
});

export const { placeOrder, cancelOrder, changeStage, setPickedOrders } =
  pizzaSLice.actions;

export default pizzaSLice.reducer;
