// components/NotificationFlow/steps/AdditionalContextStep.tsx
'use client';

import React, { useState } from 'react';
import { AdditionalContext } from '@/types/notifications';
import { Users, Calendar, MessageSquare, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

interface AdditionalContextStepProps {
  context: AdditionalContext;
  onContextChange: (context: AdditionalContext) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AdditionalContextStep: React.FC<AdditionalContextStepProps> = ({
  context,
  onContextChange,
  onNext,
  onPrev
}) => {
  const [formData, setFormData] = useState<AdditionalContext>(context);

  const targetAudienceOptions = [
    { value: '', label: 'Selecione o público-alvo' },
    { value: 'geral', label: 'Público Geral' },
    { value: 'jovens', label: 'Jovens (18-25 anos)' },
    { value: 'adultos', label: 'Adultos (26-45 anos)' },
    { value: 'seniors', label: 'Seniors (45+ anos)' },
    { value: 'profissionais', label: 'Profissionais/Executivos' },
    { value: 'estudantes', label: 'Estudantes' },
    { value: 'empreendedores', label: 'Empreendedores' }
  ];

  const ageRangeOptions = [
    { value: '', label: 'Selecione a faixa etária' },
    { value: '13-17', label: '13-17 anos' },
    { value: '18-24', label: '18-24 anos' },
    { value: '25-34', label: '25-34 anos' },
    { value: '35-44', label: '35-44 anos' },
    { value: '45-54', label: '45-54 anos' },
    { value: '55-64', label: '55-64 anos' },
    { value: '65+', label: '65+ anos' }
  ];

  const languageToneOptions = [
    { value: '', label: 'Selecione o tom da linguagem' },
    { value: 'formal', label: 'Formal' },
    { value: 'informal', label: 'Informal' },
    { value: 'amigavel', label: 'Amigável' },
    { value: 'profissional', label: 'Profissional' },
    { value: 'descontraido', label: 'Descontraído' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'educativo', label: 'Educativo' },
    { value: 'persuasivo', label: 'Persuasivo' }
  ];

  const handleInputChange = (field: keyof AdditionalContext, value: string) => {
    const updatedContext = { ...formData, [field]: value };
    setFormData(updatedContext);
    onContextChange(updatedContext);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Contexto Adicional
        </h2>
        <p className="text-lg text-gray-600">
          Adicione informações extras para personalizar as recomendações (opcional)
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Público-alvo */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              <span>Público-alvo</span>
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {targetAudienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Faixa etária */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Faixa Etária</span>
            </label>
            <select
              value={formData.ageRange}
              onChange={(e) => handleInputChange('ageRange', e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ageRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tom da linguagem */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MessageSquare className="w-4 h-4" />
              <span>Tom da Linguagem</span>
            </label>
            <select
              value={formData.languageTone}
              onChange={(e) => handleInputChange('languageTone', e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languageToneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Observações */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4" />
              <span>Observações Adicionais</span>
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              placeholder="Adicione qualquer informação adicional que possa ajudar na criação das notificações..."
              rows={4}
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500">
              {formData.observations.length}/500 caracteres
            </p>
          </div>
        </div>

        {/* Preview das informações selecionadas */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Resumo do Contexto:</h4>
          <div className="grid gap-2 text-sm">
            {formData.targetAudience && (
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">Público:</span>
                <span className="font-medium text-gray-700">
                  {targetAudienceOptions.find(opt => opt.value === formData.targetAudience)?.label}
                </span>
              </div>
            )}
            {formData.ageRange && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">Idade:</span>
                <span className="font-medium text-gray-700">{formData.ageRange} anos</span>
              </div>
            )}
            {formData.languageTone && (
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">Tom:</span>
                <span className="font-medium text-gray-700">
                  {languageToneOptions.find(opt => opt.value === formData.languageTone)?.label}
                </span>
              </div>
            )}
            {formData.observations && (
              <div className="flex items-start space-x-2">
                <FileText className="w-3 h-3 text-gray-400 mt-0.5" />
                <span className="text-gray-600">Observações:</span>
                <span className="font-medium text-gray-700">{formData.observations}</span>
              </div>
            )}
            {!formData.targetAudience && !formData.ageRange && !formData.languageTone && !formData.observations && (
              <p className="text-gray-500 italic">Nenhuma informação adicional fornecida</p>
            )}
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Gerar Sugestões</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdditionalContextStep;