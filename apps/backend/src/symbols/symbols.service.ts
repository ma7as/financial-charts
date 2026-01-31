import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SymbolsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.symbol.findMany({
      where: { isActive: true },
      orderBy: { symbol: 'asc' },
    });
  }

  async findOne(symbol: string) {
    return this.prisma.symbol.findUnique({
      where: { symbol },
    });
  }
}
