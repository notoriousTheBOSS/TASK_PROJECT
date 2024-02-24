import { configureStore } from "@reduxjs/toolkit";
import drSlice from "./drivers";

const store = configureStore({
  reducer: drSlice,
});

export default store;
