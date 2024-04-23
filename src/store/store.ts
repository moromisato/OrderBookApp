import { configureStore } from "@reduxjs/toolkit";
import networkingReducer from "./slices/networkingSlice";
import websocketReducer from "./slices/websocketSlice";
import orderBookReducer from "./slices/orderBookSlice";
import { socketMiddleware } from "./middleware/socketMiddlewere";
import { Socket } from "../utils/Socket";

export const store = configureStore({
  reducer: {
    networking: networkingReducer,
    websocket: websocketReducer,
    orderBook: orderBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(
        new Socket(process.env.EXPO_PUBLIC_BITFINEX_WS_URL ?? "")
      )
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
