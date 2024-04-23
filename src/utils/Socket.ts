import {
  PRECISION,
  SYMBOL,
  FREQUENCY,
  LENGTH,
  CHANNEL,
  EVENT,
} from "../constants/SocketMessageTypes";

export type SocketMessage = {
  event: EVENT;
  channel: CHANNEL;
  symbol: SYMBOL;
  prec?: PRECISION;
  freq?: FREQUENCY;
  len?: LENGTH;
};

export class Socket {
  private socket: WebSocket | null = null;
  constructor(private url: string) {}

  public connect() {
    if (!this.socket) {
      this.socket = new WebSocket(this.url);
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public send(message: SocketMessage) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  public on(eventName: any, callback: any) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
      console.log("registered event", eventName);
    }
  }
}
