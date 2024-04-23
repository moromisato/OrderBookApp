import { Socket } from "../../utils/Socket";
import { updateOrderBooks } from "../slices/orderBookSlice";

export const socketMiddleware =
  (socket: Socket) => (params: any) => (next: any) => (action: any) => {
    const { dispatch, getState } = params;
    const { type } = action;

    switch (type) {
      case "socket/connect":
        console.log("connect called from socket middlaware");
        socket.connect();

        socket.on("open", () => {});

        socket.on("message", (data: any) => {
          const innerData = JSON.parse(data.data);
          dispatch(updateOrderBooks(innerData));
        });

        socket.on("close", () => {
          console.log("socket closed");
        });
        break;

      case "socket/disconnect":
        socket.disconnect();
        break;

      case "socket/send":
        socket.send({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
        });
        break;

      default:
        break;
    }

    return next(action);
  };
