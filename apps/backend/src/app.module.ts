import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MarketModule } from './market/market.module';
import { SymbolsModule } from './symbols/symbols.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    HttpModule,
    PrismaModule,
    MarketModule,
    SymbolsModule,
  ],
})
export class AppModule {}
