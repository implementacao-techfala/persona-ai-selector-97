
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Phone, 
  Settings, 
  RotateCcw
} from "lucide-react";
import WhatsAppTestSession from "./WhatsAppTestSession";
import PersonalizeIAInvite from "./PersonalizeIAInvite";
import { useNavigate } from "react-router-dom";

interface AIChatProps {
  selectedName: string;
  selectedPersonality: string;
  onChangePersonality: () => void;
  onRestart: () => void;
}

const AIChat = ({ selectedName, selectedPersonality, onChangePersonality, onRestart }: AIChatProps) => {
  const [showPersonalizeInvite, setShowPersonalizeInvite] = useState(false);
  const navigate = useNavigate();

  const personalityNames: { [key: string]: string } = {
    contabilidade: "Contabilidade",
    dentista: "Dentista",
    "cirurgia-estetica": "Cirurgia Estética", 
    barbearia: "Barbearia",
    "medicina-remota": "Medicina Remota",
    psicologia: "Psicologia"
  };

  const handleShowPersonalizeInvite = () => {
    setShowPersonalizeInvite(true);
  };

  const handleAcceptPersonalize = () => {
    navigate("/personalize-ia");
  };

  const handleDeclinePersonalize = () => {
    setShowPersonalizeInvite(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {selectedName}
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              {personalityNames[selectedPersonality]}
            </Badge>
          </div>
          
          <p className="text-gray-300 text-sm">
            Sua assistente de IA está pronta para ajudar
          </p>
        </div>

        {/* Navigation Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800 rounded-lg p-2">
            <div className="px-6 py-2 rounded-md text-sm font-medium bg-green-600 text-white">
              <Phone className="h-4 w-4 inline mr-2" />
              Assistente IA
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* AI Info Card */}
            <Card className="bg-slate-900/90 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  Informações da IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-sm">Nome</Label>
                  <p className="text-white font-medium">{selectedName}</p>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm">Personalidade</Label>
                  <p className="text-cyan-400 font-medium">
                    {personalityNames[selectedPersonality]}
                  </p>
                </div>
                <Separator className="bg-slate-700" />
                <div className="space-y-2">
                  <Button
                    onClick={handleShowPersonalizeInvite}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    ✨ Personalizar IA
                  </Button>
                  <Button
                    onClick={onChangePersonality}
                    variant="outline"
                    className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Mudar Personalidade
                  </Button>
                  <Button
                    onClick={onRestart}
                    variant="outline"
                    className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <WhatsAppTestSession
              selectedName={selectedName}
              selectedPersonality={selectedPersonality}
              onChangePersonality={onChangePersonality}
            />
          </div>
        </div>
      </div>

      {/* Personalize Invite Modal */}
      {showPersonalizeInvite && (
        <PersonalizeIAInvite
          onAccept={handleAcceptPersonalize}
          onDecline={handleDeclinePersonalize}
        />
      )}
    </div>
  );
};

export default AIChat;
