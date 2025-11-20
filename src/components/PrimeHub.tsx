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
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/50 shadow-lg">
              <span className="text-base font-bold text-primary uppercase tracking-wider">✨ Solução Premium</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              PRIME HUB
            </h2>
            <p className="text-2xl font-semibold text-foreground">
              Consultoria Estratégica Completa
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A solução definitiva para empresas que querem dominar o digital e escalar com previsibilidade
            </p>
          </div>

          <div className="bg-gradient-to-br from-card via-card/80 to-card border-2 border-primary/30 rounded-2xl p-8 md:p-12 space-y-8 shadow-2xl">
            <div className="space-y-4">
              <p className="text-xl font-semibold text-foreground leading-relaxed">
                Transforme seu negócio com o acompanhamento direto do CEO Fellipe de Sá
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                O PRIME HUB é nossa entrega premium: consultoria estratégica + infraestrutura completa de marketing digital para empresas que já validaram seu produto e querem escalar com consistência.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group animate-fade-in bg-background/50 p-4 rounded-lg hover:bg-background/80 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <Button
                  onClick={onOpenForm}
                  size="lg"
                  className="relative w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-8 text-xl font-bold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-primary/50"
                >
                  <span className="flex flex-col items-center gap-2">
                    <span>🚀 Agende sua Consultoria Estratégica</span>
                    <span className="text-sm font-normal opacity-90">Vagas limitadas - Fale com nosso CEO</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
