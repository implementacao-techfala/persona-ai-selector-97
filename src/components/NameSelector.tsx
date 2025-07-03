
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle, Check } from "lucide-react";

interface NameSelectorProps {
  isVisible: boolean;
  personality: string;
  onSelect: (name: string) => void;
}

const suggestedNames = {
  contabilidade: ["Sofia", "Carlos", "Ana", "Roberto", "Marina"],
  dentista: ["Dr. Amanda", "Dr. Paulo", "Dra. Carla", "Dr. Lucas", "Dra. Beatriz"],
  "cirurgia-estetica": ["Dra. Valentina", "Dr. Rodrigo", "Dra. Isabela", "Dr. André", "Dra. Camila"],
  barbearia: ["Bruno", "Diego", "Rafael", "Thiago", "Gabriel"],
  "medicina-remota": ["Dr. Felipe", "Dra. Juliana", "Dr. Marcos", "Dra. Patricia", "Dr. Henrique"],
  psicologia: ["Dra. Cecília", "Dr. Renato", "Dra. Fernanda", "Dr. Eduardo", "Dra. Lívia"]
};

const NameSelector = ({ isVisible, personality, onSelect }: NameSelectorProps) => {
  const [selectedName, setSelectedName] = useState<string>("");
  const [customName, setCustomName] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<number>(0);

  if (!isVisible) return null;

  const names = suggestedNames[personality as keyof typeof suggestedNames] || suggestedNames.contabilidade;

  const handleRandomName = () => {
    const nextIndex = (currentSuggestion + 1) % names.length;
    setCurrentSuggestion(nextIndex);
    setSelectedName(names[nextIndex]);
    setIsCustom(false);
  };

  const handleCustomNameChange = (value: string) => {
    setCustomName(value);
    setSelectedName(value);
    setIsCustom(true);
  };

  const handleConfirm = () => {
    if (selectedName.trim()) {
      onSelect(selectedName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      {/* AI Character with profession outfit */}
      <div className="mb-12 relative">
        <div className="w-48 h-48 mx-auto mb-6 relative animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center">
            <div className="text-4xl">
              {personality === "dentista" && "🦷"}
              {personality === "contabilidade" && "💰"}
              {personality === "cirurgia-estetica" && "✨"}
              {personality === "barbearia" && "✂️"}
              {personality === "medicina-remota" && "🩺"}
              {personality === "psicologia" && "🧠"}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12 animate-fade-in delay-300">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Como quer chamar sua IA?
        </h1>
        <p className="text-xl text-gray-300">
          Escolha um nome ou crie o seu próprio
        </p>
      </div>

      <div className="w-full max-w-md space-y-6 animate-fade-in delay-500">
        {/* Suggested Name */}
        <div className="text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Sugestão:</h3>
            <div className="text-3xl font-bold text-cyan-400 mb-4">
              {names[currentSuggestion]}
            </div>
            <Button
              onClick={() => {
                setSelectedName(names[currentSuggestion]);
                setIsCustom(false);
              }}
              variant="outline"
              className="mr-2"
            >
              Usar este nome
            </Button>
            <Button
              onClick={handleRandomName}
              variant="ghost"
              size="icon"
              className="text-white hover:text-cyan-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="border-t border-gray-600 flex-1"></div>
          <span className="px-4 text-gray-400">ou</span>
          <div className="border-t border-gray-600 flex-1"></div>
        </div>

        {/* Custom Name */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 text-center">Nome personalizado:</h3>
          <Input
            placeholder="Digite o nome da sua IA..."
            value={customName}
            onChange={(e) => handleCustomNameChange(e.target.value)}
            className="text-center text-lg"
          />
        </div>

        {/* Confirm Button */}
        {selectedName && (
          <div className="text-center animate-fade-in">
            <Button
              onClick={handleConfirm}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-xl rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Check className="mr-2 h-6 w-6" />
              Criar {selectedName}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameSelector;
