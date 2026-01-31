'use client';

import { CandlestickChart } from '@/components/CandlestickChart';
import { SymbolSelector } from '@/components/SymbolSelector';
import { IntervalSelector } from '@/components/IntervalSelector';
import { useState } from 'react';

export default function Home() {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('1h');

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Financial Charts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time market data powered by ECharts
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex gap-4 mb-6">
            <SymbolSelector value={symbol} onChange={setSymbol} />
            <IntervalSelector value={interval} onChange={setInterval} />
          </div>

          <CandlestickChart symbol={symbol} interval={interval} />
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Built with Next.js, NestJS, ECharts, Prisma, and PostgreSQL
          </p>
        </footer>
      </div>
    </main>
  );
}
