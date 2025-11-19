import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrimeHubProps {
  onOpenForm: () => void;
}

const features = [
  "Criação de website profissional",
  "Consultoria estratégica com o CEO",
  "Funil completo com automações",
  "Direção de branding e expansão",
  "Campanhas omnichannel",
  "Performance consolidada",
  "Crescimento sustentável",
];

export const PrimeHub = ({ onOpenForm }: PrimeHubProps) => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-sm font-medium text-primary">Solução Premium</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              PRIME HUB
            </h2>
            <p className="text-xl text-muted-foreground">
              Para empresas que precisam de estrutura completa
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              O PRIME HUB é a nossa entrega premium. Uma solução para empresas que já validaram seu produto e precisam de estrutura completa para escalar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 text-center">
              <Button
                onClick={onOpenForm}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-8 py-3 md:py-6 text-sm md:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full md:w-auto"
              >
                Quero saber mais sobre o PRIME HUB
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
