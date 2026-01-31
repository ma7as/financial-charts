import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import * as WebSocket from 'ws';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/market',
})
export class MarketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('MarketGateway');
  private binanceConnections = new Map<string, WebSocket>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const ws = this.binanceConnections.get(client.id);
    if (ws) {
      ws.close();
      this.binanceConnections.delete(client.id);
    }
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    client: Socket,
    payload: { symbol: string; interval: string },
  ) {
    const { symbol, interval } = payload;
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;

    const ws = new WebSocket(wsUrl);

    ws.on('open', () => {
      this.logger.log(`Connected to Binance: ${symbol} ${interval}`);
    });

    ws.on('message', (data: string) => {
      const parsed = JSON.parse(data);
      const kline = parsed.k;

      client.emit('candle', {
        timestamp: kline.t,
        date: new Date(kline.t).toISOString(),
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
        volume: parseFloat(kline.v),
        isClosed: kline.x,
      });
    });

    ws.on('error', (error) => {
      this.logger.error(`WebSocket error: ${error.message}`);
    });

    this.binanceConnections.set(client.id, ws);
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(client: Socket) {
    const ws = this.binanceConnections.get(client.id);
    if (ws) {
      ws.close();
      this.binanceConnections.delete(client.id);
      this.logger.log(`Unsubscribed client: ${client.id}`);
    }
  }
}
