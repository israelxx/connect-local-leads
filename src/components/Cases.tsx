import { TrendingUp, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import case1 from "@/assets/case-1.png";
import case2 from "@/assets/case-2.png";
import case3 from "@/assets/case-3.png";
import case4 from "@/assets/case-4.png";
import caseAndrei from "@/assets/case-andrei.png";

const cases = [
  {
    name: "Porão Burger",
    metric: "+150%",
    description: "Crescimento em vendas",
    icon: TrendingUp,
    image: case4,
  },
  {
    name: "FrutValle",
    metric: "+200%",
    description: "Aumento em leads qualificados",
    icon: Users,
    image: case1,
  },
  {
    name: "Pedacinho do Céu",
    metric: "+180%",
    description: "ROI em campanhas",
    icon: DollarSign,
    image: case3,
  },
  {
    name: "Bruna Braga",
    metric: "+250%",
    description: "Aumento em leads qualificados de alto padrão",
    icon: Users,
    image: case2,
  },
  {
    name: "Andrei Gonçalves",
    metric: "+170%",
    description: "Crescimento em engajamento e seguidores",
    icon: Users,
    image: caseAndrei,
  },
];

export const Cases = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Cases e Resultados
          </h2>
          <p className="text-xl text-muted-foreground">
            Aumentamos faturamento, destravamos operações de marketing e estruturamos crescimento previsível para marcas locais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cases.map((item, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border bg-card backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-6 space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {item.metric}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Case Image - Maior e mais visível */}
                <div className="mt-4 rounded-xl overflow-hidden border-2 border-primary/20 shadow-xl bg-background">
                  <img 
                    src={item.image} 
                    alt={`Resultados ${item.name}`}
                    className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
