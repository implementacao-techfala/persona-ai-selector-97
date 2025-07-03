
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/spotlight-card";
import { AIVoiceInput } from "@/components/AIVoiceInput";
import { Progress } from "@/components/ui/progress";
import { Bot, ArrowRight, Check, Sparkles, Heart, Brain, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Step = "intro" | "recording" | "processing" | "result";

const PersonalizeIA = () => {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [progress, setProgress] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (currentStep === "processing") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentStep("result"), 500);
            return 100;
          }
          return prev + 4.3; // Aproximadamente 23 segundos
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleStartRecording = () => {
    setCurrentStep("recording");
  };

  const handleStopRecording = (duration: number) => {
    console.log('Recording stopped, duration:', duration);
  };

  const handleAudioData = (blob: Blob) => {
    setAudioBlob(blob);
    setCurrentStep("processing");
  };

  const handleFinish = () => {
    navigate("/");
  };

  const renderIntro = () => (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <GlowCard 
        glowColor="purple" 
        customSize 
        className="w-full max-w-2xl h-auto p-8 animate-scale-in"
      >
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mb-6">
              <Bot className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white animate-fade-in">
              Personalize sua IA
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in delay-300">
              Vamos criar uma assistente única com sua personalidade
            </p>
            <p className="text-gray-400 text-sm animate-fade-in delay-500">
              Grave um áudio de 10-30 segundos falando sobre você, seus interesses e como gostaria que sua IA se comportasse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in delay-700">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Heart className="h-5 w-5 text-red-400" />
              <span>Sua personalidade</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Brain className="h-5 w-5 text-blue-400" />
              <span>Seus interesses</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Seu estilo</span>
            </div>
          </div>

          <Button
            onClick={handleStartRecording}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg animate-fade-in delay-1000"
          >
            <Bot className="h-5 w-5 mr-2" />
            Começar Gravação
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </GlowCard>
    </div>
  );

  const renderRecording = () => (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <GlowCard 
        glowColor="purple" 
        customSize 
        className="w-full max-w-2xl h-auto p-8"
      >
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Conte sobre você
            </h2>
            <p className="text-gray-300">
              Fale sobre seus interesses, personalidade e como gostaria que sua IA se comportasse
            </p>
          </div>

          <AIVoiceInput
            onStart={handleStartRecording}
            onStop={handleStopRecording}
            onAudioData={handleAudioData}
            className="py-8"
          />

          <div className="space-y-2 text-sm text-gray-400">
            <p>💡 Dicas para uma IA personalizada:</p>
            <div className="text-left space-y-1 max-w-md mx-auto">
              <p>• Fale sobre seus hobbies e interesses</p>
              <p>• Mencione seu estilo de comunicação preferido</p>
              <p>• Descreva como gostaria de ser tratado</p>
              <p>• Compartilhe suas preferências profissionais</p>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );

  const renderProcessing = () => (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <GlowCard 
        glowColor="blue" 
        customSize 
        className="w-full max-w-2xl h-auto p-8"
      >
        <div className="text-center space-y-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <Brain className="h-10 w-10 text-white" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Criando sua IA personalizada
            </h2>
            <p className="text-gray-300">
              Analisando sua voz e preferências...
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-400">
              {Math.round(progress)}% completo - {Math.max(0, 23 - Math.round(progress * 0.23))}s restantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span>Analisando voz</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress > 60 ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span>Processando personalidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress > 90 ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span>Finalizando IA</span>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );

  const renderResult = () => (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <GlowCard 
        glowColor="green" 
        customSize 
        className="w-full max-w-2xl h-auto p-8"
      >
        <div className="text-center space-y-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center">
            <Check className="h-10 w-10 text-white" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Sua IA está pronta! 🎉
            </h2>
            <p className="text-gray-300">
              Criamos uma assistente única baseada em sua personalidade e preferências
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Características da sua IA:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <Check className="h-4 w-4" />
                <span>Personalidade única</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Check className="h-4 w-4" />
                <span>Baseada em sua voz</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Check className="h-4 w-4" />
                <span>Adaptada aos seus interesses</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Check className="h-4 w-4" />
                <span>Estilo de comunicação personalizado</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleFinish}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Começar a usar minha IA
          </Button>
        </div>
      </GlowCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {currentStep === "intro" && renderIntro()}
      {currentStep === "recording" && renderRecording()}
      {currentStep === "processing" && renderProcessing()}
      {currentStep === "result" && renderResult()}
    </div>
  );
};

export default PersonalizeIA;
