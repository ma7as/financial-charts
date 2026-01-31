import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OhlcQueryDto } from './dto/ohlc-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getOhlcData(query: OhlcQueryDto) {
    try {
      // Fetch from Binance API
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: query.symbol,
            interval: query.interval,
            limit: query.limit,
            startTime: query.startTime,
            endTime: query.endTime,
          },
        }),
      );

      // Transform data
      const ohlcData = data.map((candle: any[]) => ({
        timestamp: candle[0],
        date: new Date(candle[0]).toISOString(),
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5]),
      }));

      return {
        symbol: query.symbol,
        interval: query.interval,
        data: ohlcData,
        count: ohlcData.length,
      };
    } catch (error) {
      this.logger.error(`Error fetching market data: ${error.message}`);
      throw new HttpException(
        'Error fetching market data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  calculateMA(data: any[], period: number): number[] {
    const closes = data.map((d) => d.close);
    const ma: number[] = [];

    for (let i = 0; i < closes.length; i++) {
      if (i < period - 1) {
        ma.push(null);
      } else {
        const sum = closes
          .slice(i - period + 1, i + 1)
          .reduce((a, b) => a + b, 0);
        ma.push(sum / period);
      }
    }

    return ma;
  }
}
