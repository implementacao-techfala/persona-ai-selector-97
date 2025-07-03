
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface PersonalitySelectorProps {
  isVisible: boolean;
  onSelect: (personality: string) => void;
}

const personalities = [
  {
    id: "contabilidade",
    name: "Contabilidade",
    description: "Especialista em finanças e impostos",
    color: "from-green-400 to-emerald-600",
    icon: "💰",
    features: ["Impostos", "Planejamento", "Consultoria", "Análises"]
  },
  {
    id: "dentista",
    name: "Dentista",
    description: "Cuidados odontológicos personalizados",
    color: "from-blue-400 to-cyan-600",
    icon: "🦷",
    features: ["Consultas", "Prevenção", "Tratamentos", "Emergências"]
  },
  {
    id: "cirurgia-estetica",
    name: "Cirurgia Estética",
    description: "Consultas sobre procedimentos estéticos",
    color: "from-pink-400 to-rose-600",
    icon: "✨",
    features: ["Consultas", "Procedimentos", "Orientações", "Pós-op"]
  },
  {
    id: "barbearia",
    name: "Barbearia",
    description: "Especialista em cortes e estilo masculino",
    color: "from-amber-400 to-orange-600",
    icon: "✂️",
    features: ["Cortes", "Barba", "Estilo", "Agendamentos"]
  },
  {
    id: "medicina-remota",
    name: "Medicina Remota",
    description: "Telemedicina e consultas online",
    color: "from-purple-400 to-violet-600",
    icon: "🩺",
    features: ["Telemedicina", "Triagem", "Orientações", "Receitas"]
  },
  {
    id: "psicologia",
    name: "Psicologia",
    description: "Apoio emocional e bem-estar mental",
    color: "from-teal-400 to-cyan-600",
    icon: "🧠",
    features: ["Terapia", "Orientação", "Bem-estar", "Suporte"]
  }
];

const PersonalitySelector = ({ isVisible, onSelect }: PersonalitySelectorProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string>("");

  if (!isVisible) return null;

  const handleSelect = (personality: string) => {
    setSelectedId(personality);
    setTimeout(() => onSelect(personality), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Epic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Transitioning AI figure */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-20 scale-50 transition-all duration-1000 animate-fade-in">
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center relative">
          <Sparkles className="h-8 w-8 text-white animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Epic title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Escolha a 
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Especialidade
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Sua IA vai se transformar para atender perfeitamente sua área de atuação
          </p>
        </div>

        {/* Enhanced carousel */}
        <div className="w-full animate-fade-in delay-500">
          <Carousel className="w-full" opts={{ align: "center", loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {personalities.map((personality) => (
                <CarouselItem key={personality.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card 
                    className={`cursor-pointer transition-all duration-700 transform hover:scale-105 relative overflow-hidden group ${
                      selectedId === personality.id 
                        ? 'ring-4 ring-cyan-400 scale-105 shadow-2xl shadow-cyan-400/25' 
                        : 'hover:ring-2 hover:ring-purple-400 hover:shadow-xl hover:shadow-purple-400/20'
                    }`}
                    onClick={() => handleSelect(personality.id)}
                    onMouseEnter={() => setHoveredId(personality.id)}
                    onMouseLeave={() => setHoveredId("")}
                  >
                    <CardContent className="p-0 relative">
                      {/* Epic gradient background */}
                      <div className={`w-full h-64 bg-gradient-to-br ${personality.color} relative overflow-hidden`}>
                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                        
                        {/* Floating particles */}
                        {hoveredId === personality.id && (
                          <div className="absolute inset-0">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 2}s`,
                                  animationDuration: `${1 + Math.random()}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}

                        {/* Icon and content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                          <div className="text-7xl mb-4 transform transition-transform duration-500 group-hover:scale-110">
                            {personality.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                            {personality.name}
                          </h3>
                          <p className="text-white/90 text-sm drop-shadow">
                            {personality.description}
                          </p>
                        </div>

                        {/* Selection glow */}
                        {selectedId === personality.id && (
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-purple-400/20 animate-pulse"></div>
                        )}
                      </div>
                      
                      {/* Features list */}
                      <div className="p-6 bg-slate-900/95 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {personality.features.map((feature, index) => (
                            <div key={index} className="text-gray-300 flex items-center">
                              <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Loading state */}
                      {selectedId === personality.id && (
                        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center">
                          <div className="text-center">
                            <div className="inline-block w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-white font-medium">Configurando sua IA...</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-16 bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700" />
            <CarouselNext className="hidden md:flex -right-16 bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700" />
          </Carousel>
        </div>

        {/* Enhanced instruction */}
        <div className="mt-12 text-center text-gray-400 animate-fade-in delay-1000">
          <p className="text-lg">
            ✨ Escolha a especialidade que melhor representa sua área de atuação
          </p>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PersonalitySelector;
