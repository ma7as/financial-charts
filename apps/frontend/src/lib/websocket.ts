import { io, Socket } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8101';

export class MarketWebSocket {
  private socket: Socket;

  constructor() {
    this.socket = io(`${WS_URL}/market`, {
      transports: ['websocket'],
      autoConnect: false,
    });
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  subscribe(
    symbol: string,
    interval: string,
    callback: (data: any) => void,
  ) {
    this.socket.emit('subscribe', { symbol, interval });
    this.socket.on('candle', callback);
  }

  unsubscribe() {
    this.socket.emit('unsubscribe');
    this.socket.off('candle');
  }

  onConnect(callback: () => void) {
    this.socket.on('connect', callback);
  }

  onDisconnect(callback: () => void) {
    this.socket.on('disconnect', callback);
  }

  onError(callback: (error: any) => void) {
    this.socket.on('error', callback);
  }
}
