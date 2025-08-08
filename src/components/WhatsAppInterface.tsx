
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, Send, Paperclip, Mic, MoreVertical, Trash2, UserPlus } from 'lucide-react';
import { useN8N } from '../hooks/useN8N';
import PhoneNumberInput from './PhoneNumberInput';

interface WhatsAppInterfaceProps {
  reservedNumber: string;
  aiName: string;
  onClearMemory: () => void;
  isLoadingClearMemory: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isLoading?: boolean;
}

// Configuração atualizada do N8N com o novo endpoint
const N8N_CONFIG = {
  baseUrl: "https://automatewebhook.techfala.com.br",
  webhookToken: ""
};

const WhatsAppInterface = ({ reservedNumber, aiName, onClearMemory, isLoadingClearMemory }: WhatsAppInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Olá! Sou ${aiName}, sua assistente virtual. Como posso ajudar você hoje?`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { sendMessage: sendN8NMessage } = useN8N(N8N_CONFIG);

  // Auto-scroll para as mensagens mais recentes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    const currentMessage = message;
    setMessage('');

    // Adicionar mensagem de loading da IA
    const loadingMessage: Message = {
      id: messages.length + 2,
      text: "Digitando...",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Usar o hook useN8N para enviar a mensagem
      const response = await sendN8NMessage(currentMessage);
      
      console.log('Message response:', response);

      // Remover mensagem de loading e adicionar resposta real
      const aiResponse: Message = {
        id: messages.length + 3,
        text: response?.['resposta-i.a'] || response?.response || response?.message || "Desculpe, não consegui processar sua mensagem.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => prev.filter(msg => !msg.isLoading).concat([aiResponse]));

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remover mensagem de loading e adicionar mensagem de erro
      const errorMessage: Message = {
        id: messages.length + 3,
        text: "Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se o servidor está configurado corretamente.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => prev.filter(msg => !msg.isLoading).concat([errorMessage]));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Card className="bg-slate-900 border-slate-700 h-full flex flex-col">
        {/* Header do WhatsApp */}
        <CardHeader className="bg-green-600 text-white p-3 flex-row items-center space-y-0 flex-shrink-0">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs sm:text-sm">AI</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-base truncate">{aiName}</h3>
              <p className="text-xs text-green-100 truncate">{reservedNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Button
              onClick={() => setShowPhoneInput(true)}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-green-700 p-1.5 sm:p-2"
              title="Compartilhar com Amigos"
            >
              <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              onClick={onClearMemory}
              disabled={isLoadingClearMemory}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-green-700 p-1.5 sm:p-2"
              title="Apagar Memória da IA"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-green-700 p-1.5 sm:p-2 hidden sm:flex">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-green-700 p-1.5 sm:p-2 hidden sm:flex">
              <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Área de mensagens com scroll otimizado */}
        <CardContent className="flex-1 p-0 bg-gray-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNlZWUiIHN0cm9rZS13aWR0aD0iLjUiIGQ9Im0wIDAgMjAgMjBtMC0yMCAyMCAyMCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] min-h-0">
          <ScrollArea className="h-full">
            <div 
              ref={messagesContainerRef}
              className="p-2 sm:p-4 space-y-2 sm:space-y-3 min-h-full flex flex-col justify-end"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow ${
                      msg.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-800'
                    } ${msg.isLoading ? 'animate-pulse' : ''}`}
                  >
                    <p className="text-sm break-words">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Input de mensagem otimizado para mobile */}
        <div className="p-2 sm:p-3 bg-gray-50 border-t flex-shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button size="sm" variant="ghost" className="text-gray-500 hover:bg-gray-200 p-1.5 sm:p-2 flex-shrink-0 hidden sm:flex">
              <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma mensagem"
                className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>
            <Button size="sm" variant="ghost" className="text-gray-500 hover:bg-gray-200 p-1.5 sm:p-2 flex-shrink-0 hidden sm:flex">
              <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              onClick={sendMessage}
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white p-1.5 sm:p-2 flex-shrink-0"
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de números de telefone */}
      {showPhoneInput && (
        <PhoneNumberInput
          n8nConfig={N8N_CONFIG}
          onClose={() => setShowPhoneInput(false)}
        />
      )}
    </>
  );
};

export default WhatsAppInterface;
