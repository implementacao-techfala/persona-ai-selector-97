
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const careers = [
  { id: "developer", name: "Desenvolvedor" },
  { id: "designer", name: "Designer" },
  { id: "manager", name: "Gerente" },
  { id: "analyst", name: "Analista" },
  { id: "teacher", name: "Professor" },
  { id: "doctor", name: "Médico" },
  { id: "engineer", name: "Engenheiro" },
  { id: "lawyer", name: "Advogado" }
];

const CareerSelector = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const sendCareerRequest = async (careerId: string) => {
    setIsLoading(true);
    console.log("Enviando requisição para carreira:", careerId);

    try {
      // Simulando uma requisição HTTP
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career: careerId,
          timestamp: new Date().toISOString(),
          userId: Math.floor(Math.random() * 1000)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta da API:", data);
        
        toast({
          title: "Requisição enviada com sucesso!",
          description: `Carreira "${careers.find(c => c.id === careerId)?.name}" foi processada.`,
        });
      } else {
        throw new Error("Falha na requisição");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      toast({
        title: "Erro ao enviar requisição",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId);
    sendCareerRequest(careerId);
  };

  return (
    <div className="space-y-4">
      <Select value={selectedCareer} onValueChange={handleCareerSelect} disabled={isLoading}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione uma profissão" />
        </SelectTrigger>
        <SelectContent>
          {careers.map((career) => (
            <SelectItem key={career.id} value={career.id}>
              {career.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Enviando requisição...</span>
        </div>
      )}

      {selectedCareer && !isLoading && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Profissão selecionada:</p>
          <p className="text-lg">{careers.find(c => c.id === selectedCareer)?.name}</p>
        </div>
      )}
    </div>
  );
};

export default CareerSelector;
