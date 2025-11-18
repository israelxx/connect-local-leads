import { Shield, CheckCircle2 } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-glow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-6 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Garantia de Resultado
            </h2>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 md:p-12 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                "Se você aplicar tudo que ensinamos e não obtiver resultados, devolvemos seu dinheiro."
              </p>
              
              <div className="w-20 h-1 bg-primary mx-auto"></div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Essa garantia existe porque confiamos no nosso método, na nossa estratégia e no impacto que entregamos para marcas locais todos os meses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Método Testado</h3>
                <p className="text-sm text-muted-foreground">Comprovado em centenas de projetos</p>
              </div>
              
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Estratégia Sólida</h3>
                <p className="text-sm text-muted-foreground">Baseada em dados e resultados</p>
              </div>
              
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Impacto Real</h3>
                <p className="text-sm text-muted-foreground">Crescimento mensurável e sustentável</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
