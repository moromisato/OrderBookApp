import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  currentSubscription: undefined,
};

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connectToWebsocket: (state) => {
      state.isConnected = true;
    },
    disconnectFromWebsocket: (state) => {
      state.isConnected = false;
    },
    subscribe: (state, action) => {
      state.currentSubscription = action.payload;
    },
  },
});

export const { connectToWebsocket, disconnectFromWebsocket, subscribe } =
  websocketSlice.actions;

export default websocketSlice.reducer;
