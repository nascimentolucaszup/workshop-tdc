// types/notifications.ts
export interface Trend {
  id: string;
  term: string;
  searches: number;
  variation: number;
  date: string;
  duration: string;
  category?: string;
}

export interface AdditionalContext {
  targetAudience: string;
  ageRange: string;
  languageTone: string;
  observations: string;
}

// @/types/notifications.ts
export interface NotificationSuggestion {
  id: string;
  title: string;
  content: string;
  associatedTrends: string[];
  status: 'pending' | 'approved' | 'rejected' | 'edited';
  generatedAt: string;
  // Adicionar estas propriedades:
  aiGenerated?: boolean;
  aiJustification?: string;
  engagementType?: 'informativo' | 'promocional' | 'urgente' | 'educativo';
  estimatedClicks?: 'alta' | 'média' | 'baixa';
}

export interface FlowState {
  selectedTrends: Trend[];
  context: AdditionalContext;
  suggestions: NotificationSuggestion[];
  currentStep: number;
}