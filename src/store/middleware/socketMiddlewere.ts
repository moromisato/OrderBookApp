import { Socket } from "../../utils/Socket";
import { updateOrderBooks } from "../slices/orderBookSlice";

export const socketMiddleware =
  (socket: Socket) => (params: any) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type } = action;

    switch (type) {
      case "websocket/connectToWebsocket":
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

      case "websocket/disconnectFromWebsocket":
        socket.disconnect();
        break;

      case "websocket/subscribe":
        const { payload } = action;
        console.log("calling subscribe with ", payload);
        socket.send(payload);
        break;

      default:
        break;
    }

    return next(action);
  };
