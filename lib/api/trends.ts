// lib/api/trends.ts
import { TrendData, TrendsResponse, TrendsApiError } from '@/types/trends';

export class TrendsApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/trends') {
    this.baseUrl = baseUrl;
  }

  async getTrends(params?: {
    category?: 'compras' | 'tecnologia';
    limit?: number;
    offset?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<TrendsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.category) searchParams.set('category', params.category);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.order) searchParams.set('order', params.order);

    const url = `${this.baseUrl}?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: TrendsApiError = await response.json();
      throw new Error(errorData.error || 'Erro ao carregar tendências');
    }

    return response.json();
  }

  async getComprasTrends(params?: {
    limit?: number;
    offset?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<TrendsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.order) searchParams.set('order', params.order);

    const url = `${this.baseUrl}/compras?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: TrendsApiError = await response.json();
      throw new Error(errorData.error || 'Erro ao carregar tendências de compras');
    }

    return response.json();
  }

  async getTecnologiaTrends(params?: {
    limit?: number;
    offset?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<TrendsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.order) searchParams.set('order', params.order);

    const url = `${this.baseUrl}/tecnologia?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: TrendsApiError = await response.json();
      throw new Error(errorData.error || 'Erro ao carregar tendências de tecnologia');
    }

    return response.json();
  }
}

// Instância singleton
export const trendsApi = new TrendsApiClient();