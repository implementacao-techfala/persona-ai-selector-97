
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, Zap, RefreshCw } from "lucide-react";
import { useN8N } from "../hooks/useN8N";
import { ReservedNumber } from "../services/n8nService";
import WhatsAppInterface from "./WhatsAppInterface";

interface WhatsAppTestSessionProps {
  selectedName: string;
  selectedPersonality: string;
  onChangePersonality: () => void;
}

// Configuração atualizada do N8N com o novo endpoint
const N8N_CONFIG = {
  baseUrl: "https://automatewebhook.techfala.com.br",
  webhookToken: ""
};

const WhatsAppTestSession = ({ selectedName, selectedPersonality, onChangePersonality }: WhatsAppTestSessionProps) => {
  const [sessionTime, setSessionTime] = useState(900); // 15 minutos em segundos
  const [isActive, setIsActive] = useState(false);
  const [reservedNumberData, setReservedNumberData] = useState<ReservedNumber | null>(null);
  
  const { reserveNumber, changePersonality, clearMemory, releaseNumber, isLoading } = useN8N(N8N_CONFIG);

  // Timer para a sessão de teste
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && sessionTime > 0) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev - 1);
      }, 1000);
    } else if (sessionTime === 0) {
      handleEndSession();
    }

    return () => clearInterval(interval);
  }, [isActive, sessionTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = async () => {
    const numberData = await reserveNumber(selectedPersonality);
    if (numberData) {
      setReservedNumberData(numberData);
      setIsActive(true);
      setSessionTime(900); // Reset para 15 minutos
    }
  };

  const handleEndSession = async () => {
    if (reservedNumberData) {
      await releaseNumber(reservedNumberData.sessionId);
    }
    setIsActive(false);
    setSessionTime(900);
    setReservedNumberData(null);
  };

  const handleChangePersonality = async () => {
    if (reservedNumberData) {
      const success = await changePersonality(selectedPersonality);
      
      if (success) {
        setReservedNumberData(prev => prev ? { ...prev, personality: selectedPersonality } : null);
      }
    }
    onChangePersonality();
  };

  const handleClearMemory = async () => {
    if (reservedNumberData) {
      await clearMemory();
    }
  };

  const personalityNames: { [key: string]: string } = {
    contabilidade: "Contabilidade",
    dentista: "Dentista",
    "cirurgia-estetica": "Cirurgia Estética", 
    barbearia: "Barbearia",
    "medicina-remota": "Medicina Remota",
    psicologia: "Psicologia"
  };

  if (!isActive && !reservedNumberData) {
    return (
      <Card className="bg-slate-900/90 border-slate-700 backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-white flex items-center justify-center gap-2">
            <Phone className="h-6 w-6 text-green-400" />
            Teste no WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Phone className="h-10 w-10 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Inicie sua Sessão de Teste
              </h3>
              <p className="text-gray-300 text-sm">
                Reserve um número do WhatsApp por 15 minutos para testar {selectedName} 
                com a personalidade de {personalityNames[selectedPersonality]}
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                <Clock className="h-4 w-4" />
                <span>15 minutos de teste gratuito</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                <Zap className="h-4 w-4" />
                <span>Integração com N8N e Redis</span>
              </div>
            </div>

            <Button 
              onClick={startSession}
              disabled={isLoading}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone className="h-5 w-5 mr-2" />
              {isLoading ? 'Reservando...' : 'Iniciar Teste no WhatsApp'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/90 border-slate-700 backdrop-blur-xl h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-400" />
            Sessão Ativa
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-400 text-green-400">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(sessionTime)}
            </Badge>
            <Button
              onClick={handleEndSession}
              size="sm"
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-3 sm:p-6 space-y-3 sm:space-y-4">
        {/* Info da IA ativa - responsiva */}
        <div className="bg-slate-800 rounded-lg p-3 sm:p-4 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 sm:mb-2">
            <h4 className="text-white font-medium text-sm sm:text-base">IA Ativa:</h4>
            <Button
              onClick={handleChangePersonality}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white text-xs sm:text-sm"
            >
              {isLoading ? 'Alterando...' : 'Mudar Personalidade'}
            </Button>
          </div>
          <p className="text-cyan-400 text-sm sm:text-base">{selectedName} - {personalityNames[selectedPersonality]}</p>
        </div>

        {/* Número reservado - responsivo */}
        {reservedNumberData && (
          <div className="bg-green-900/30 border border-green-400/30 rounded-lg p-3 sm:p-4 flex-shrink-0">
            <h4 className="text-green-400 font-medium mb-2 text-sm sm:text-base">Número Reservado:</h4>
            <p className="text-white text-base sm:text-lg font-mono break-all">{reservedNumberData.number}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Sessão: {reservedNumberData.sessionId}
            </p>
          </div>
        )}

        {/* Interface do WhatsApp - usa todo o espaço restante */}
        {reservedNumberData && (
          <div className="flex-1 min-h-0">
            <WhatsAppInterface
              reservedNumber={reservedNumberData.number}
              aiName={selectedName}
              onClearMemory={handleClearMemory}
              isLoadingClearMemory={isLoading}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsAppTestSession;
