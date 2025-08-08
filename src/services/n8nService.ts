
export interface N8NConfig {
  baseUrl: string;
  webhookToken?: string;
}

export interface ReservedNumber {
  number: string;
  sessionId: string;
  personality: string;
  expiresAt: string;
}

class N8NService {
  private config: N8NConfig;

  constructor(config: N8NConfig) {
    this.config = config;
  }

  // Gera ou recupera um ID persistente do usuário
  private getUserId(): string {
    let userId = localStorage.getItem('user-session-id');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('user-session-id', userId);
    }
    return userId;
  }

  async reserveNumber(personality: string): Promise<ReservedNumber> {
    try {
      const userId = this.getUserId();
      
      console.log('Reserving number with config:', this.config);
      console.log('Sending request to:', `${this.config.baseUrl}/webhook/reservar-numero`);
      
      const response = await fetch(`${this.config.baseUrl}/webhook/reservar-numero`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.webhookToken && { 'Authorization': `Bearer ${this.config.webhookToken}` })
        },
        body: JSON.stringify({
          userId,
          personality,
          timestamp: new Date().toISOString(),
          action: 'reserve_number'
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Number reserved successfully:', data);
      
      // Retornar dados mockados se a resposta do N8N não tiver a estrutura esperada
      return {
        number: data.number || '+55 11 99999-9999',
        sessionId: data.sessionId || userId,
        personality: personality,
        expiresAt: data.expiresAt || new Date(Date.now() + 15 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error('Error reserving number:', error);
      throw error;
    }
  }

  async sendMessage(message: string): Promise<any> {
    try {
      const userId = this.getUserId();
      
      console.log('Sending message with config:', this.config);
      console.log('Sending request to:', `${this.config.baseUrl}/webhook/definir-mensagem`);
      
      const response = await fetch(`${this.config.baseUrl}/webhook/definir-mensagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.webhookToken && { 'Authorization': `Bearer ${this.config.webhookToken}` })
        },
        body: JSON.stringify({
          userId,
          message,
          timestamp: new Date().toISOString(),
          action: 'send_message'
        })
      });

      console.log('Message response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Message sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async sendPrompt(prompt: string, mode: 'original' | 'alteracao' = 'original'): Promise<any> {
    try {
      const userId = this.getUserId();

      console.log('Sending prompt with config:', this.config, 'mode:', mode);
      console.log('Sending request to:', `${this.config.baseUrl}/webhook/definir-mensagem`);

      const body: Record<string, any> = {
        userId,
        timestamp: new Date().toISOString(),
      };

      if (mode === 'alteracao') {
        body['prompt-alteracao'] = prompt;
        body.action = 'update_prompt';
      } else {
        body['prompt'] = prompt;
        body.action = 'define_prompt';
      }

      const response = await fetch(`${this.config.baseUrl}/webhook/definir-mensagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.webhookToken && { 'Authorization': `Bearer ${this.config.webhookToken}` })
        },
        body: JSON.stringify(body)
      });

      console.log('Prompt response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Prompt sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Error sending prompt:', error);
      throw error;
    }
  }

  async definePhone(phoneNumbers: string[]): Promise<void> {
    try {
      const userId = this.getUserId();
      
      console.log('Defining phone numbers:', phoneNumbers);
      console.log('Sending request to:', `${this.config.baseUrl}/webhook/alterar-ia-telefone`);
      
      const response = await fetch(`${this.config.baseUrl}/webhook/alterar-ia-telefone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.webhookToken && { 'Authorization': `Bearer ${this.config.webhookToken}` })
        },
        body: JSON.stringify({
          userId,
          phoneNumbers,
          primaryPhone: phoneNumbers[0] || null,
          additionalPhones: phoneNumbers.slice(1),
          timestamp: new Date().toISOString(),
          action: 'define_phone'
        })
      });

      console.log('Phone define response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Phone numbers defined successfully:', data);
    } catch (error) {
      console.error('Error defining phone numbers:', error);
      throw error;
    }
  }

  // Métodos simplificados para compatibilidade
  async changePersonality(personality: string): Promise<void> {
    console.log('Change personality called with:', personality);
    // Este método pode ser implementado futuramente no workflow N8N
  }

  async defineName(name: string): Promise<void> {
    console.log('Define name called with:', name);
    // Este método pode ser implementado futuramente no workflow N8N
  }

  async clearMemory(): Promise<void> {
    console.log('Clear memory called');
    // Este método pode ser implementado futuramente no workflow N8N
  }

  async releaseNumber(sessionId: string): Promise<void> {
    console.log('Release number called with sessionId:', sessionId);
    // Este método pode ser implementado futuramente no workflow N8N
  }
}

export default N8NService;
