
import { useState, useCallback } from 'react';
import N8NService, { N8NConfig, ReservedNumber } from '../services/n8nService';
import { useToast } from '@/hooks/use-toast';

export const useN8N = (config: N8NConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const n8nService = new N8NService(config);

  const reserveNumber = useCallback(async (personality: string): Promise<ReservedNumber | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await n8nService.reserveNumber(personality);
      toast({
        title: "Número Reservado",
        description: `Número ${result.number} reservado com sucesso!`,
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao reservar número';
      setError(errorMessage);
      toast({
        title: "Erro na Conexão",
        description: "Verifique se o servidor está configurado corretamente e acessível.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService, toast]);

  const sendMessage = useCallback(async (message: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await n8nService.sendMessage(message);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
      setError(errorMessage);
      toast({
        title: "Erro ao Enviar Mensagem",
        description: "Verifique se o servidor está configurado corretamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService, toast]);

  const changePersonality = useCallback(async (personality: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await n8nService.changePersonality(personality);
      toast({
        title: "Personalidade Alterada",
        description: "A personalidade da IA foi alterada com sucesso!",
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar personalidade';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService, toast]);

  const defineName = useCallback(async (name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await n8nService.defineName(name);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao definir nome';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService, toast]);

  const definePhone = useCallback(async (phoneNumbers: string[]): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await n8nService.definePhone(phoneNumbers);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao definir telefones';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService, toast]);

  // Métodos legados mantidos para compatibilidade
  const clearMemory = useCallback(async (): Promise<boolean> => {
    try {
      await n8nService.clearMemory();
      return true;
    } catch (err) {
      return false;
    }
  }, [n8nService]);

  const releaseNumber = useCallback(async (sessionId: string): Promise<boolean> => {
    try {
      await n8nService.releaseNumber(sessionId);
      return true;
    } catch (err) {
      return false;
    }
  }, [n8nService]);

  return {
    isLoading,
    error,
    reserveNumber,
    changePersonality,
    defineName,
    sendMessage,
    definePhone,
    clearMemory,
    releaseNumber
  };
};
