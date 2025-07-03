
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save, X } from 'lucide-react';

interface N8NConfigProps {
  onConfigSave: (config: { baseUrl: string; webhookToken?: string }) => void;
  onClose: () => void;
  currentConfig?: { baseUrl: string; webhookToken?: string };
}

const N8NConfig = ({ onConfigSave, onClose, currentConfig }: N8NConfigProps) => {
  const [baseUrl, setBaseUrl] = useState(currentConfig?.baseUrl || '');
  const [webhookToken, setWebhookToken] = useState(currentConfig?.webhookToken || '');

  const handleSave = () => {
    onConfigSave({
      baseUrl: baseUrl.trim(),
      webhookToken: webhookToken.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-900 border-slate-700 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuração N8N
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL Base do N8N
            </label>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://seu-n8n.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <p className="text-xs text-gray-400 mt-1">
              Digite a URL do seu servidor N8N (ex: https://n8n.exemplo.com)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Token do Webhook (Opcional)
            </label>
            <input
              type="password"
              value={webhookToken}
              onChange={(e) => setWebhookToken(e.target.value)}
              placeholder="Token de autenticação"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-white hover:bg-slate-700"
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default N8NConfig;
