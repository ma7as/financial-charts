'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { marketApi } from '@/lib/api-client';
import { MarketWebSocket } from '@/lib/websocket';

const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center">Loading chart...</div>,
});

interface Props {
  symbol: string;
  interval: string;
}

export function CandlestickChart({ symbol, interval }: Props) {
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const [ws, setWs] = useState<MarketWebSocket | null>(null);

  // Fetch historical data
  const { data, isLoading } = useQuery({
    queryKey: ['ohlc', symbol, interval],
    queryFn: () => marketApi.getOhlc({ symbol, interval, limit: 200 }),
  });

  // Setup WebSocket for real-time updates
  useEffect(() => {
    const socket = new MarketWebSocket();
    socket.connect();

    socket.subscribe(symbol, interval, (candle) => {
      setRealtimeData((prev) => [...prev, candle]);
    });

    setWs(socket);

    return () => {
      socket.unsubscribe();
      socket.disconnect();
    };
  }, [symbol, interval]);

  if (isLoading) {
    return <div className="h-[600px] flex items-center justify-center">Loading...</div>;
  }

  const chartData = data?.data || [];
  const dates = chartData.map((d: any) => new Date(d.timestamp).toLocaleString());
  const ohlc = chartData.map((d: any) => [d.open, d.close, d.low, d.high]);
  const volumes = chartData.map((d: any) => d.volume);

  const option = {
    title: {
      text: `${symbol} - ${interval}`,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (params: any) => {
        const data = params[0].data;
        return `
          <strong>${params[0].name}</strong><br/>
          Open: ${data[0]}<br/>
          Close: ${data[1]}<br/>
          Low: ${data[2]}<br/>
          High: ${data[3]}
        `;
      },
    },
    grid: [
      {
        left: '10%',
        right: '10%',
        height: '50%',
      },
      {
        left: '10%',
        right: '10%',
        top: '70%',
        height: '15%',
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
      {
        type: 'category',
        gridIndex: 1,
        data: dates,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 80,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        bottom: 10,
        start: 80,
        end: 100,
      },
    ],
    series: [
      {
        type: 'candlestick',
        name: symbol,
        data: ohlc,
        itemStyle: {
          color: '#00da3c',
          color0: '#ec0000',
          borderColor: '#008F28',
          borderColor0: '#8A0000',
        },
      },
      {
        type: 'bar',
        name: 'Volume',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumes,
        itemStyle: {
          color: '#7fbe9e',
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactECharts
        option={option}
        style={{ height: '600px', width: '100%' }}
        notMerge={true}
        lazyUpdate={true}
      />
      {realtimeData.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Real-time updates: {realtimeData.length} candles received
        </div>
      )}
    </div>
  );
}
