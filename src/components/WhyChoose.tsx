import { Award, TrendingUp, Zap } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Mais de 10 anos de experiência",
    description: "Expertise consolidada em marketing digital e tráfego pago.",
  },
  {
    icon: TrendingUp,
    title: "Centenas de clientes satisfeitos",
    description: "Empresas locais faturando mais e conquistando seu mercado.",
  },
  {
    icon: Zap,
    title: "Processos otimizados",
    description: "Soluções integradas que aceleram resultados e reduzem custos.",
  },
];

export const WhyChoose = () => {
  return (
    <section id="sobre" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Por que escolher a Pro Connect?
          </h2>
          <p className="text-xl text-secondary-foreground/80">
            Transformamos estratégia em crescimento real para seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-8 rounded-2xl bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center">
                <reason.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">{reason.title}</h3>
              <p className="text-secondary-foreground/80 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
