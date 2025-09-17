// components/NotificationFlow/steps/TrendSelectionStep.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Trend } from '@/types/trends';
import { useTrends } from '@/hooks/useTrends';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  RefreshCw, 
  AlertCircle, 
  ArrowRight,
  ShoppingBag,
  Cpu
} from 'lucide-react';
import { randomUUID } from 'crypto';

interface TrendSelectionStepProps {
  selectedTrends: Trend[];
  onTrendsChange: (trends: Trend[]) => void;
  onNext: () => void;
}

const TrendSelectionStep: React.FC<TrendSelectionStepProps> = ({
  selectedTrends,
  onTrendsChange,
  onNext
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'compras' | 'tecnologia' | undefined>(undefined);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce para a busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    trends,
    total,
    loading,
    error,
    metadata,
    lastUpdated,
    refetch,
    setSearch,
    setCategory
  } = useTrends({
    search: debouncedSearch,
    category: categoryFilter,
    limit: 50,
    autoFetch: true
  });

  // Atualizar busca na API quando debouncedSearch muda
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  // Atualizar categoria na API quando categoryFilter muda
  useEffect(() => {
    setCategory(categoryFilter);
  }, [categoryFilter, setCategory]);

  const handleTrendToggle = (trend: Trend) => {
    const isSelected = selectedTrends.some(t => t.id === trend.id);
    if (isSelected) {
      onTrendsChange(selectedTrends.filter(t => t.id !== trend.id));
    } else {
      onTrendsChange([...selectedTrends, trend]);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    // Manter strings como "há 4 dias", "ontem" no formato original
    if (dateString.includes('há') || dateString === 'ontem') {
      return dateString;
    }
    return dateString;
  };

  const getCategoryConfig = (category?: string) => {
    switch (category) {
      case 'compras':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Compras',
          icon: ShoppingBag
        };
      case 'tecnologia':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Tecnologia',
          icon: Cpu
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'Geral',
          icon: null
        };
    }
  };

  // Loading state inicial
  if (loading && trends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Carregando Tendências</h3>
          <p className="text-gray-600">Buscando as últimas tendências...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Selecione as Tendências
        </h2>
        <p className="text-lg text-gray-600">
          Escolha as tendências que deseja usar para gerar recomendações de notificações
        </p>
      </div>

      {/* Metadados e estatísticas */}
      {metadata && !loading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-blue-900">Total de Pesquisas</div>
              <div className="text-2xl font-bold text-blue-700">{formatNumber(metadata.totalSearches)}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-900">Variação Média</div>
              <div className="text-2xl font-bold text-blue-700">{metadata.averageVariation}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-900">Tendência Top</div>
              <div className="text-lg font-semibold text-blue-700 truncate">{metadata.topTrend}</div>
            </div>
          </div>
        </div>
      )}

      {/* Controles de filtro e busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Barra de pesquisa */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar tendências..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {loading && (
            <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
          )}
        </div>

        {/* Filtro de categoria */}
        <div className="flex items-center space-x-2 min-w-fit">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value as 'compras' | 'tecnologia' || undefined)}
            className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Todas as categorias</option>
            <option value="compras">Compras</option>
            <option value="tecnologia">Tecnologia</option>
          </select>
        </div>

        {/* Botão de atualizar */}
        <button
          onClick={refetch}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-3 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-fit"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Indicador de resultados */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          {total > 0 ? (
            <>Mostrando <span className="font-medium">{trends.length}</span> de <span className="font-medium">{total}</span> tendências</>
          ) : (
            <>Nenhuma tendência encontrada</>
          )}
        </div>
        {lastUpdated && (
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Atualizado: {new Date(lastUpdated).toLocaleString('pt-BR')}</span>
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Erro ao carregar tendências</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button
            onClick={refetch}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Lista de tendências */}
      {trends.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trends.map((trend) => {
            const isSelected = selectedTrends.some(t => t.id === trend.id);
            const categoryConfig = getCategoryConfig(trend.category);
            const CategoryIcon = categoryConfig.icon;

            return (
              <div
                key={Math.random()}
                className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleTrendToggle(trend)}
              >
                {/* Checkbox */}
                <div className="absolute top-4 right-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleTrendToggle(trend)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Conteúdo do card */}
                <div className="space-y-3 pr-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {trend.term}
                    </h3>
                    {trend.category && (
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full mt-2 border ${categoryConfig.color}`}>
                        {CategoryIcon && <CategoryIcon className="w-3 h-3" />}
                        <span>{categoryConfig.label}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Search className="w-4 h-4" />
                      <span>{formatNumber(trend.searches)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {trend.variation >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${
                        trend.variation >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trend.variation > 0 ? '+' : ''}{trend.variation}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(trend.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{trend.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {trends.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma tendência encontrada
          </h3>
          <p className="text-gray-600 mb-4">
            {searchInput || categoryFilter
              ? 'Tente ajustar os filtros de busca'
              : 'Não há tendências disponíveis no momento'
            }
          </p>
          {(searchInput || categoryFilter) && (
            <button
              onClick={() => {
                setSearchInput('');
                setCategoryFilter(undefined);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Rodapé com ações */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{selectedTrends.length}</span> tendência(s) selecionada(s)
          {selectedTrends.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedTrends.map((trend) => (
                <span
                  key={trend.id}
                  className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {trend.term}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrendToggle(trend);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={selectedTrends.length === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedTrends.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Avançar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TrendSelectionStep;  