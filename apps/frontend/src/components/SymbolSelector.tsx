'use client';

import { useQuery } from '@tanstack/react-query';
import { symbolsApi } from '@/lib/api-client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SymbolSelector({ value, onChange }: Props) {
  const { data: symbols } = useQuery({
    queryKey: ['symbols'],
    queryFn: symbolsApi.getAll,
  });

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {symbols?.map((symbol: any) => (
        <option key={symbol.id} value={symbol.symbol}>
          {symbol.name} ({symbol.symbol})
        </option>
      ))}
      {!symbols && <option value={value}>{value}</option>}
    </select>
  );
}
