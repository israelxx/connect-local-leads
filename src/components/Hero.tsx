import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenForm: () => void;
}

export const Hero = ({ onOpenForm }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 bg-tech-grid"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
            Crescer sem estratégia{" "}
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              custa caro.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estruturamos o crescimento de marcas que já validaram seu produto — mas travaram para escalar.
          </p>
          <div className="pt-8">
            <Button onClick={onOpenForm} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-lg font-bold rounded-lg shadow-[0_0_40px_rgba(0,112,243,0.3)] hover:shadow-[0_0_60px_rgba(0,112,243,0.5)] transition-all duration-300 hover:scale-105">
              Quero crescer com estratégia
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
