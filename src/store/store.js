"use client";
import { configureStore } from "@reduxjs/toolkit";
import userFetchReducer from "./reducer/userFetchReducer";
const store = configureStore({
  reducer: {
    user: userFetchReducer,
  },
});

export default store;
