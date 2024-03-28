import { configureStore } from "@reduxjs/toolkit";

import pizzaSlice from "./redux/slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    pizzaSlice: pizzaSlice,
  },
});
