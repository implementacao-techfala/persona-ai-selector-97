
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Plus, X, Send } from 'lucide-react';
import { useN8N } from '../hooks/useN8N';

interface PhoneNumberInputProps {
  n8nConfig: { baseUrl: string; webhookToken?: string };
  onClose: () => void;
}

const PhoneNumberInput = ({ n8nConfig, onClose }: PhoneNumberInputProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);
  const { definePhone } = useN8N(n8nConfig);

  const addPhoneField = () => {
    if (phoneNumbers.length < 3) {
      setPhoneNumbers([...phoneNumbers, '']);
    }
  };

  const removePhoneField = (index: number) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    }
  };

  const updatePhoneNumber = (index: number, value: string) => {
    const updated = [...phoneNumbers];
    updated[index] = value;
    setPhoneNumbers(updated);
  };

  const handleSubmit = async () => {
    const validNumbers = phoneNumbers.filter(num => num.trim() !== '');
    
    if (validNumbers.length === 0) {
      onClose(); // Permite pular se não quiser adicionar números
      return;
    }

    // Enviar array com todos os números no background e continuar imediatamente
    definePhone(validNumbers);
    onClose();
  };

  const handleSkip = () => {
    onClose(); // Permite pular esta etapa
  };

  return (
    <Card className="w-full max-w-md bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Phone className="h-5 w-5 text-green-400" />
          Compartilhe o Futuro
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Coloque o seu número e de alguns amigos que gostariam de testar o futuro
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {phoneNumbers.map((phone, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => updatePhoneNumber(index, e.target.value)}
                placeholder={`Número ${index + 1} - Ex: +55 11 99999-9999`}
                className="flex-1 bg-slate-800 border-slate-600 text-white"
              />
              {phoneNumbers.length > 1 && (
                <Button
                  onClick={() => removePhoneField(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:bg-red-900/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {phoneNumbers.length < 3 && (
          <Button
            onClick={addPhoneField}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar outro número
          </Button>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleSkip}
            variant="outline"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Pular
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneNumberInput;
