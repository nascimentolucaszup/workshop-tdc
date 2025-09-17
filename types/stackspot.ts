// types/stackspot.ts
export interface StackSpotAuthRequest {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
}

export interface StackSpotAuthResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope?: string;
}

export interface StackSpotExecutionRequest {
  input_data: string;
  execution_tag?: string;
  upload_ids?: string[];
  conversation_id?: string;
}

export interface StackSpotExecutionResponse {
  execution_id: string;
  quick_command_slug: string;
  conversation_id: string;
}

export interface StackSpotProgress {
  start: string;
  end?: string;
  duration?: number;
  execution_percentage: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

export interface StackSpotStepResult {
  answer: string;
  sources: any[];
}

export interface StackSpotStep {
  step_name: string;
  execution_order: number;
  type: 'LLM' | 'WEB_REQUEST';
  step_result: StackSpotStepResult;
}

export interface StackSpotCallbackResponse {
  execution_id: string;
  quick_command_slug: string;
  conversation_id: string;
  progress: StackSpotProgress;
  steps: StackSpotStep[];
  result: string;
}

export interface StackSpotError {
  type: string;
  code: string;
  details: string;
}

// Configuração dos Quick Commands
export interface QuickCommandConfig {
  slug: string;
  name: string;
  description: string;
}

export const QUICK_COMMANDS: Record<string, QuickCommandConfig> = {
  NOTIFICATION_GENERATOR: {
    slug: 'rqc-marketing-push-notification',
    name: 'Gerador de Sugestões de Notificações',
    description: 'Gera sugestões personalizadas de notificações baseadas em tendências'
  },
  CONTENT_OPTIMIZER: {
    slug: 'optimize-notification-content',
    name: 'Otimizador de Conteúdo',
    description: 'Otimiza o conteúdo das notificações para melhor engajamento'
  }
} as const;