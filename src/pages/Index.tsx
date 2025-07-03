
import { useState } from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import PersonalitySelector from "../components/PersonalitySelector";
import NameSelector from "../components/NameSelector";
import PhoneNumberInput from "../components/PhoneNumberInput";
import AIChat from "../components/AIChat";

type Step = "welcome" | "personality" | "name" | "phone" | "complete";

// Configuração atualizada do N8N com o novo endpoint
const N8N_CONFIG = {
  baseUrl: "https://automatewebhook.techfala.com.br",
  webhookToken: ""
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [selectedPersonality, setSelectedPersonality] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");

  const handleContinue = () => {
    setCurrentStep("personality");
  };

  const handlePersonalitySelect = (personality: string) => {
    setSelectedPersonality(personality);
    setCurrentStep("name");
  };

  const handleNameSelect = (name: string) => {
    setSelectedName(name);
    setCurrentStep("phone");
  };

  const handlePhoneSubmit = () => {
    setCurrentStep("complete");
  };

  const handleChangePersonality = () => {
    setCurrentStep("personality");
  };

  const handleRestart = () => {
    setSelectedPersonality("");
    setSelectedName("");
    setCurrentStep("welcome");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <WelcomeScreen 
        isVisible={currentStep === "welcome"} 
        onContinue={handleContinue} 
      />
      
      <PersonalitySelector
        isVisible={currentStep === "personality"}
        onSelect={handlePersonalitySelect}
      />

      <NameSelector
        isVisible={currentStep === "name"}
        personality={selectedPersonality}
        onSelect={handleNameSelect}
      />

      {currentStep === "phone" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <PhoneNumberInput
            n8nConfig={N8N_CONFIG}
            onClose={handlePhoneSubmit}
          />
        </div>
      )}

      {currentStep === "complete" && (
        <AIChat
          selectedName={selectedName}
          selectedPersonality={selectedPersonality}
          onChangePersonality={handleChangePersonality}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
