import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MarketService } from './market.service';
import { OhlcQueryDto } from './dto/ohlc-query.dto';

@ApiTags('market')
@Controller('api/v1/market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('ohlc')
  @ApiOperation({ summary: 'Get OHLC candlestick data' })
  @ApiResponse({ status: 200, description: 'Returns OHLC data' })
  async getOhlc(@Query() query: OhlcQueryDto) {
    return this.marketService.getOhlcData(query);
  }

  @Get('indicators')
  @ApiOperation({ summary: 'Get technical indicators (MA, RSI, etc.)' })
  async getIndicators(
    @Query() query: OhlcQueryDto,
    @Query('ma') maPeriods?: string,
  ) {
    const ohlcData = await this.marketService.getOhlcData(query);
    const periods = maPeriods?.split(',').map(Number) || [20, 50];

    const indicators = periods.map((period) => ({
      name: `MA${period}`,
      data: this.marketService.calculateMA(ohlcData.data, period),
    }));

    return {
      ...ohlcData,
      indicators,
    };
  }
}
