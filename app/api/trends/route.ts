// app/api/trends/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { TrendData, TrendsResponse } from '@/types/trends';
import { randomUUID } from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // 'compras', 'tecnologia', ou null para ambos
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'variacao';
    const order = searchParams.get('order') || 'desc';

    let allTrends: TrendData[] = [];

    // Carregar dados baseado na categoria
    if (!category || category === 'compras') {
      const comprasPath = path.join(process.cwd(), 'docs/db', 'compras.json');
      const comprasData = JSON.parse(await fs.readFile(comprasPath, 'utf8'));
      const comprasWithCategory = comprasData.map((trend: TrendData) => ({
        ...trend,
        id: randomUUID(),
        categoria: 'compras' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      allTrends.push(...comprasWithCategory);
    }

    if (!category || category === 'tecnologia') {
      const techPath = path.join(process.cwd(), 'docs/db', 'tecnologia.json');
      const techData = JSON.parse(await fs.readFile(techPath, 'utf8'));
      const techWithCategory = techData.map((trend: TrendData) => ({
        ...trend,
        id: randomUUID(),
        categoria: 'tecnologia' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      allTrends.push(...techWithCategory);
    }

    // Aplicar filtro de busca
    if (search) {
      allTrends = allTrends.filter(trend => 
        trend.termo.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Aplicar ordenação
    allTrends.sort((a, b) => {
      let aValue: string | number = a[sortBy as keyof TrendData] as string;
      let bValue: string | number = b[sortBy as keyof TrendData] as string;

      if (sortBy === 'variacao') {
        aValue = parseInt(aValue.replace(/[^\d]/g, ''));
        bValue = parseInt(bValue.replace(/[^\d]/g, ''));
      }

      if (order === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Aplicar paginação
    const total = allTrends.length;
    const paginatedTrends = allTrends.slice(offset, offset + limit);

    // Calcular metadados
    const totalSearchesNum = allTrends.reduce((acc, trend) => {
      const searches = parseInt(trend.pesquisas.replace(/[^\d]/g, ''));
      return acc + (searches || 0);
    }, 0);

    const averageVariation = allTrends.reduce((acc, trend) => {
      const variation = parseInt(trend.variacao.replace(/[^\d]/g, ''));
      return acc + (variation || 0);
    }, 0) / allTrends.length;

    const topTrend = allTrends.reduce((max, trend) => {
      const currentVariation = parseInt(trend.variacao.replace(/[^\d]/g, ''));
      const maxVariation = parseInt(max.variacao.replace(/[^\d]/g, ''));
      return currentVariation > maxVariation ? trend : max;
    });

    const response: TrendsResponse = {
      success: true,
      data: paginatedTrends,
      total,
      category: category || 'todas',
      lastUpdated: new Date().toISOString(),
      metadata: {
        totalSearches: totalSearchesNum,
        averageVariation: `${Math.round(averageVariation)}%`,
        topTrend: topTrend.termo
      }
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    console.error('Erro ao carregar dados das tendências:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor ao carregar tendências',
      code: 500,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}