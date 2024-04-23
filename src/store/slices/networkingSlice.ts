import { createSlice } from "@reduxjs/toolkit";
import { CHECK_CONNECTION } from "../../constants/NetworkingActionTypes";

const initialState = {
  isOnline: false,
};

export const networkingSlice = createSlice({
  name: "networking",
  initialState,
  reducers: {
    checkConnection: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { checkConnection } = networkingSlice.actions;
export default networkingSlice.reducer;
