// components/NotificationFlow/NotificationFlowLayout.tsx
'use client';

import React, { useState } from 'react';
import { FlowState, Trend, AdditionalContext, NotificationSuggestion } from '@/types/notifications';
import TrendSelectionStep from './steps/TrendSelectionStep';
import AdditionalContextStep from './steps/AdditionalContextStep';
import SuggestionsStep from './steps/SuggestionsStep';

const INITIAL_STATE: FlowState = {
  selectedTrends: [],
  context: {
    targetAudience: '',
    ageRange: '',
    languageTone: '',
    observations: ''
  },
  suggestions: [],
  currentStep: 1
};

const NotificationFlowLayout: React.FC = () => {
  const [flowState, setFlowState] = useState<FlowState>(INITIAL_STATE);

  const updateSelectedTrends = (trends: Trend[]) => {
    setFlowState(prev => ({
      ...prev,
      selectedTrends: trends
    }));
  };

  const updateContext = (context: AdditionalContext) => {
    setFlowState(prev => ({
      ...prev,
      context
    }));
  };

  const updateSuggestions = (suggestions: NotificationSuggestion[]) => {
    setFlowState(prev => ({
      ...prev,
      suggestions
    }));
  };

  const nextStep = () => {
    setFlowState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  };

  const prevStep = () => {
    setFlowState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  const renderStep = () => {
    switch (flowState.currentStep) {
      case 1:
        return (
          <TrendSelectionStep
            selectedTrends={flowState.selectedTrends}
            onTrendsChange={updateSelectedTrends}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <AdditionalContextStep
            context={flowState.context}
            onContextChange={updateContext}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <SuggestionsStep
            selectedTrends={flowState.selectedTrends}
            context={flowState.context}
            suggestions={flowState.suggestions}
            onSuggestionsChange={updateSuggestions}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com indicador de progresso */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Recomendações de Notificações
            </h1>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === flowState.currentStep
                      ? 'bg-blue-600 text-white'
                      : step < flowState.currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default NotificationFlowLayout;