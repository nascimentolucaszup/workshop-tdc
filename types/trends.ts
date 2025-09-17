// types/trends.ts
export interface TrendData {
  id: string;
  termo: string;
  pesquisas: string;
  variacao: string;
  data: string;
  duracao: string;
  categoria?: 'compras' | 'tecnologia';
  createdAt?: string;
  updatedAt?: string;
}

export interface TrendsResponse {
  success: true;
  data: TrendData[];
  total: number;
  category: string;
  lastUpdated: string;
  metadata?: {
    totalSearches: number;
    averageVariation: string;
    topTrend: string;
  };
}

export interface TrendsApiError {
  success: false;
  error: string;
  code: number;
  timestamp: string;
}

// Union type para resposta da API
export type ApiResponse = TrendsResponse | TrendsApiError;

// Adapter para compatibilidade com o componente existente
export interface Trend {
  id: string;
  term: string;
  searches: number;
  variation: number;
  date: string;
  duration: string;
  category?: string;
}