import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Zap } from "lucide-react";

const results = [
  {
    icon: Target,
    metric: "R$ 335.745",
    label: "Em vendas geradas",
    highlight: "ROAS médio de 41.57x",
    description: "Campanhas otimizadas com alta performance"
  },
  {
    icon: TrendingUp,
    metric: "46.41x",
    label: "Retorno sobre investimento",
    highlight: "R$ 1.856 investidos",
    description: "Gerando R$ 86.170 em conversões"
  },
  {
    icon: Zap,
    metric: "4036",
    label: "Conversões no site",
    highlight: "Custo de R$ 2,00 por resultado",
    description: "Performance consistente e escalável"
  },
  {
    icon: DollarSign,
    metric: "27.09x",
    label: "ROAS em campanhas",
    highlight: "R$ 29.746 em vendas",
    description: "Com investimento de R$ 1.097"
  },
];

export const Results = () => {
  return (
    <section id="resultados" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Resultados Reais
          </h2>
          <p className="text-xl text-muted-foreground">
            Números comprovados de campanhas que geraram crescimento real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <Card
                key={index}
                className="bg-card hover:shadow-xl transition-all duration-300 animate-fade-in border-border/50 hover:border-primary/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">
                      {result.metric}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {result.label}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/50 space-y-1">
                    <p className="text-sm font-semibold text-primary">
                      {result.highlight}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
