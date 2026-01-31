import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8101';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const marketApi = {
  getOhlc: async (params: {
    symbol: string;
    interval: string;
    limit?: number;
  }) => {
    const { data } = await apiClient.get('/api/v1/market/ohlc', { params });
    return data;
  },

  getIndicators: async (params: {
    symbol: string;
    interval: string;
    ma?: string;
  }) => {
    const { data } = await apiClient.get('/api/v1/market/indicators', {
      params,
    });
    return data;
  },
};

export const symbolsApi = {
  getAll: async () => {
    const { data } = await apiClient.get('/api/v1/symbols');
    return data;
  },

  getOne: async (symbol: string) => {
    const { data } = await apiClient.get(`/api/v1/symbols/${symbol}`);
    return data;
  },
};
