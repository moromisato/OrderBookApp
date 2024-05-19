import { createSlice } from "@reduxjs/toolkit";

type PriceLevel = {
  count: number;
  amount: number;
};

export type OrderBookStructure = {
  bids: Record<number, PriceLevel>;
  asks: Record<number, PriceLevel>;
  precision?: string;
};

const availablePrecisions = ["P0", "P1", "P2", "P3", "P4"];

const initialState = {
  bids: {},
  asks: {},
  precision: availablePrecisions[0],
};

const convertToBidsAsksStructure = (orderBooks: [number, number, number][]) => {
  const bids: Record<number, PriceLevel> = {};
  const asks: Record<number, PriceLevel> = {};

  orderBooks.forEach((orderBook) => {
    const [price, count, amount] = orderBook;
    if (count > 0) {
      if (amount > 0) {
        bids[price] = { count, amount };
      } else {
        asks[price] = { count, amount };
      }
    }
  });

  return { bids, asks };
};

export const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    updatePrecision: (state: OrderBookStructure, action) => {
      const currentPrecisionIndex = availablePrecisions.findIndex(
        (precision) => precision === state.precision,
      );
      if (
        action.payload.changePrecision === "increase" &&
        currentPrecisionIndex + 1 < availablePrecisions.length
      ) {
        const nextPrecisionIndex = currentPrecisionIndex + 1;
        state.precision = availablePrecisions[nextPrecisionIndex];
      }
      if (
        action.payload.changePrecision === "decrease" &&
        currentPrecisionIndex - 1 >= 0
      ) {
        const nextPrecisionIndex = currentPrecisionIndex - 1;
        state.precision = availablePrecisions[nextPrecisionIndex];
      }
    },
    updateOrderBooks: (state: OrderBookStructure, action) => {
      if (action.payload.length == 2 && action.payload[1].length > 3) {
        const { bids, asks } = convertToBidsAsksStructure(action.payload[1]);

        state.asks = asks;
        state.bids = bids;
      } else if (action.payload.length == 2) {
        const [price, count, amount] = action.payload[1];

        if (count > 0) {
          if (amount > 0) {
            state.bids[price] = { count, amount };
          } else if (amount < 0) {
            state.asks[price] = { count, amount };
          }
        } else if (count === 0) {
          if (amount === 1) {
            delete state.bids[price];
          } else if (amount === -1) {
            delete state.asks[price];
          }
        }
      }
    },
  },
});

export const { updateOrderBooks, updatePrecision } = orderBookSlice.actions;
export default orderBookSlice.reducer;
