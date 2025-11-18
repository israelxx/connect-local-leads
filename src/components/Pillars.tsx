import { Target, Palette, TrendingUp, Users, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    icon: Target,
    title: "Estratégia",
    description: "Clareza e direção para cada ação e campanha",
  },
  {
    icon: Palette,
    title: "Criatividade",
    description: "Conteúdos e campanhas alinhadas à essência da marca",
  },
  {
    icon: TrendingUp,
    title: "Tráfego & Dados",
    description: "Investimento inteligente com otimização contínua",
  },
  {
    icon: Users,
    title: "Conversão & Vendas",
    description: "Funis ativos, alinhamento e acompanhamento",
  },
  {
    icon: Rocket,
    title: "Crescimento",
    description: "Resultados previsíveis e escaláveis mês após mês",
  },
];

export const Pillars = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Diagonal lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Os 5 Pilares Pro Connect
          </h2>
          <p className="text-xl text-muted-foreground">
            A base sólida que sustenta o crescimento da sua marca
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border bg-card/50 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                  <pillar.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pillar.description}
                </p>
                
                {/* Number indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
