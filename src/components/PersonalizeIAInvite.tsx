
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Bot, Sparkles, Timer } from "lucide-react";

interface PersonalizeIAInviteProps {
  onAccept: () => void;
  onDecline: () => void;
}

const PersonalizeIAInvite = ({ onAccept, onDecline }: PersonalizeIAInviteProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(onAccept, 300);
  };

  const handleDecline = () => {
    setIsVisible(false);
    setTimeout(onDecline, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <GlowCard 
        glowColor="purple" 
        customSize 
        className="w-full max-w-md h-auto p-6 animate-scale-in"
      >
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mb-4">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">
              Quer testar uma personalizada só pra você?
            </h2>
            <p className="text-gray-300 text-sm">
              Crie uma IA única com sua personalidade em apenas 23 segundos
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-purple-400">
            <Timer className="h-4 w-4" />
            <span className="text-sm font-medium">23 segundos</span>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Não, obrigado
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Vamos lá!
            </Button>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

export default PersonalizeIAInvite;
