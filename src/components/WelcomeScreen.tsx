
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  isVisible: boolean;
  onContinue: () => void;
}

const WelcomeScreen = ({ isVisible, onContinue }: WelcomeScreenProps) => {
  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with GIF */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 z-10"></div>
        
        {/* Background GIF */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.pinimg.com/originals/4e/87/ab/4e87ab4ed8221a3872feed6e75b9a2ae.gif')`
          }}
        ></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse z-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000 z-20"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 z-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-30 text-center max-w-4xl mx-auto px-4">
        {/* AI figure - simplified without pulsing circle */}
        <div className="mb-12 relative">
          <div className="w-80 h-80 mx-auto mb-8 relative">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-600/30 rounded-full filter blur-2xl animate-pulse"></div>
            
            {/* Main figure silhouette */}
            <div className="absolute inset-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-cyan-400/50">
              {/* Inner mysterious glow */}
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-full"></div>
              
              {/* Central AI core - static, no pulsing */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-300 to-purple-400 rounded-full flex items-center justify-center relative">
                  <Sparkles className="h-8 w-8 text-slate-900" />
                </div>
              </div>
              
              {/* Floating particles around the figure */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"
                  style={{
                    top: `${20 + Math.sin(i * Math.PI / 4) * 30}%`,
                    left: `${50 + Math.cos(i * Math.PI / 4) * 35}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Status indicators */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-400/20 border-2 border-green-400 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-blue-400/20 border-2 border-blue-400 rounded-full flex items-center justify-center animate-bounce delay-500">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Epic typography */}
        <div className="mb-12 space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            Qual vai ser a
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 animate-fade-in delay-300">
            personalidade da sua IA?
          </h2>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-500">
            Crie uma assistente inteligente especializada em sua área de atuação. 
            <span className="block mt-2 text-cyan-400">Tecnologia avançada, resultados extraordinários.</span>
          </p>
        </div>

        {/* Epic CTA button */}
        <div className="animate-fade-in delay-700">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 text-2xl rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl shadow-purple-500/25 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Iniciar Jornada
              <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude'
            }}></div>
          </Button>
        </div>

        {/* Subtitle with mystique */}
        <p className="mt-8 text-gray-500 text-lg animate-fade-in delay-1000">
          Powered by advanced AI • Designed for excellence
        </p>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6',
              opacity: 0.1 + Math.random() * 0.3,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
