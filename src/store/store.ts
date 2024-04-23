import { configureStore } from "@reduxjs/toolkit";
import networkingReducer from "./slices/networkingSlice";

export const store = configureStore({
  reducer: {
    networking: networkingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
