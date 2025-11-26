import { useState } from "react";
import { TrendingUp, DollarSign, Users, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import case1 from "@/assets/case-1.png";
import case2 from "@/assets/case-2.png";
import case3 from "@/assets/case-3.png";
import case4 from "@/assets/case-4.png";
import caseAndrei from "@/assets/case-andrei.png";

const cases = [
  {
    metric: "+150%",
    description: "Crescimento em vendas",
    icon: TrendingUp,
    image: case4,
  },
  {
    metric: "+200%",
    description: "Aumento em leads qualificados",
    icon: Users,
    image: case1,
  },
  {
    metric: "+180%",
    description: "ROI em campanhas",
    icon: DollarSign,
    image: case3,
  },
  {
    metric: "+250%",
    description: "Aumento em leads qualificados de alto padrão",
    icon: Users,
    image: case2,
  },
  {
    metric: "+170%",
    description: "Crescimento em engajamento e seguidores",
    icon: Users,
    image: caseAndrei,
  },
];


export const Cases = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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
              
              <CardContent className="p-0 relative z-10">
                {/* Case Image - Agora em destaque principal */}
                <div 
                  className="w-full aspect-square overflow-hidden bg-background cursor-pointer"
                  onClick={() => setZoomedImage(item.image)}
                >
                  <img 
                    src={item.image} 
                    alt={`Resultados do case`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Metrics overlay */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {item.metric}
                    </div>
                  </div>
                  
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {zoomedImage && (
          <div 
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setZoomedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
              onClick={() => setZoomedImage(null)}
            >
              <X className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
            </button>
            <div className="max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <img 
                src={zoomedImage} 
                alt="Resultado ampliado"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
