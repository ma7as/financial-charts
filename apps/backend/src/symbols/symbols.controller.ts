import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SymbolsService } from './symbols.service';

@ApiTags('symbols')
@Controller('api/v1/symbols')
export class SymbolsController {
  constructor(private readonly symbolsService: SymbolsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available symbols' })
  async findAll() {
    return this.symbolsService.findAll();
  }

  @Get(':symbol')
  @ApiOperation({ summary: 'Get symbol by name' })
  async findOne(@Param('symbol') symbol: string) {
    return this.symbolsService.findOne(symbol);
  }
}
