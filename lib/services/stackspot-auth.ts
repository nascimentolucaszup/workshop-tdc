// lib/services/stackspot-auth.ts
import { StackSpotAuthRequest, StackSpotAuthResponse, StackSpotError } from '@/types/stackspot';

class StackSpotAuthService {
  private static instance: StackSpotAuthService;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private constructor() {}

  static getInstance(): StackSpotAuthService {
    if (!StackSpotAuthService.instance) {
      StackSpotAuthService.instance = new StackSpotAuthService();
    }
    return StackSpotAuthService.instance;
  }

  private isTokenValid(): boolean {
    if (!this.accessToken || !this.tokenExpiry) {
      return false;
    }
    // Verificar se o token expira nos próximos 5 minutos (buffer de segurança)
    return Date.now() < (this.tokenExpiry - 5 * 60 * 1000);
  }

  async getAccessToken(): Promise<string> {
    if (this.isTokenValid() && this.accessToken) {
      return this.accessToken;
    }

    return this.authenticate();
  }

  private async authenticate(): Promise<string> {
    const clientId = process.env.STACKSPOT_CLIENT_ID;
    const clientSecret = process.env.STACKSPOT_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('StackSpot credentials not configured');
    }

    const authData: StackSpotAuthRequest = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    };

    try {
      const response = await fetch('https://idm.stackspot.com/stackspot-freemium/oidc/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(authData as any),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Authentication failed: ${response.status} ${errorText}`);
      }

      const authResponse: StackSpotAuthResponse = await response.json();
      
      this.accessToken = authResponse.access_token;
      // Calcular tempo de expiração (expires_in é em segundos)
      this.tokenExpiry = Date.now() + (authResponse.expires_in * 1000);

      return this.accessToken;
    } catch (error) {
      console.error('StackSpot authentication error:', error);
      throw error;
    }
  }

  clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
  }
}

export const stackSpotAuth = StackSpotAuthService.getInstance();