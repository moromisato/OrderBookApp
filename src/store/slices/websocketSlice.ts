import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
};

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connect: (state) => {
      return { ...state, isConnected: true };
    },
    disconnect: (state) => {
      return { ...state, isConnected: false };
    },
  },
});

export const { connect, disconnect } = websocketSlice.actions;
export default websocketSlice.reducer;
