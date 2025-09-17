// hooks/useTrends.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendData, TrendsResponse, TrendsApiError, ApiResponse, Trend } from '@/types/trends';

interface UseTrendsParams {
  category?: 'compras' | 'tecnologia';
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  autoFetch?: boolean;
}

interface UseTrendsReturn {
  trends: Trend[];
  total: number;
  loading: boolean;
  error: string | null;
  metadata: TrendsResponse['metadata'];
  lastUpdated: string | null;
  refetch: () => Promise<void>;
  setSearch: (search: string) => void;
  setCategory: (category: 'compras' | 'tecnologia' | undefined) => void;
}

// Função para converter TrendData para Trend
const adaptTrendData = (trendData: TrendData): Trend => {
  // Extrair número de pesquisas (ex: "20 mil+" -> 20000)
  const searchesText = trendData.pesquisas.toLowerCase();
  let searches = 0;
  
  const numberMatch = searchesText.match(/(\d+)/);
  if (numberMatch) {
    const baseNumber = parseInt(numberMatch[1]);
    if (searchesText.includes('mil')) {
      searches = baseNumber * 1000;
    } else {
      searches = baseNumber;
    }
  }

  // Extrair variação numérica (ex: "50%" -> 50)
  const variationMatch = trendData.variacao.match(/(\d+)/);
  const variation = variationMatch ? parseInt(variationMatch[1]) : 0;

  return {
    id: trendData.id,
    term: trendData.termo,
    searches,
    variation,
    date: trendData.data,
    duration: trendData.duracao,
    category: trendData.categoria
  };
};

// Type guard para verificar se a resposta é um erro
const isApiError = (response: ApiResponse): response is TrendsApiError => {
  return response.success === false;
};

export const useTrends = (params: UseTrendsParams = {}): UseTrendsReturn => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<TrendsResponse['metadata']>(undefined);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(params.search || '');
  const [category, setCategory] = useState<'compras' | 'tecnologia' | undefined>(params.category);

  const {
    limit = 20,
    sortBy = 'variacao',
    order = 'desc',
    autoFetch = true
  } = params;

  const fetchTrends = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      
      if (category) searchParams.set('category', category);
      if (limit) searchParams.set('limit', limit.toString());
      if (searchTerm) searchParams.set('search', searchTerm);
      if (sortBy) searchParams.set('sortBy', sortBy);
      if (order) searchParams.set('order', order);

      const response = await fetch(`/api/trends?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      // Verificar se a resposta é um erro usando type guard
      if (isApiError(data)) {
        throw new Error(data.error || 'Erro desconhecido ao carregar tendências');
      }

      // Converter dados da API para o formato esperado pelo componente
      const adaptedTrends = data.data.map(adaptTrendData);
      
      setTrends(adaptedTrends);
      setTotal(data.total);
      setMetadata(data.metadata);
      setLastUpdated(data.lastUpdated);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar tendências:', err);
    } finally {
      setLoading(false);
    }
  }, [category, limit, searchTerm, sortBy, order]);

  const refetch = useCallback(() => {
    return fetchTrends();
  }, [fetchTrends]);

  const setSearch = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  const setCategoryFilter = useCallback((cat: 'compras' | 'tecnologia' | undefined) => {
    setCategory(cat);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchTrends();
    }
  }, [fetchTrends, autoFetch]);

  return {
    trends,
    total,
    loading,
    error,
    metadata,
    lastUpdated,
    refetch,
    setSearch,
    setCategory: setCategoryFilter
  };
};