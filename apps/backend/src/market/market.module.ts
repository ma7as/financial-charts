import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { MarketGateway } from './market.gateway';

@Module({
  imports: [HttpModule],
  controllers: [MarketController],
  providers: [MarketService, MarketGateway],
})
export class MarketModule {}
