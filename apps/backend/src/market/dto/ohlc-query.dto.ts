import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OhlcQueryDto {
  @ApiProperty({ example: 'BTCUSDT', description: 'Trading pair symbol' })
  @IsString()
  symbol: string;

  @ApiProperty({ example: '1h', description: 'Candle interval', required: false })
  @IsString()
  @IsOptional()
  interval?: string = '1h';

  @ApiProperty({ example: 100, description: 'Number of candles to return', required: false })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 100;

  @ApiProperty({ description: 'Start timestamp (ms)', required: false })
  @IsOptional()
  @Type(() => Number)
  startTime?: number;

  @ApiProperty({ description: 'End timestamp (ms)', required: false })
  @IsOptional()
  @Type(() => Number)
  endTime?: number;
}
