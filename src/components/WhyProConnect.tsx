import { Lightbulb, Users, TrendingUp } from "lucide-react";

export const WhyProConnect = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-50"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nossa Missão</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Por que a Pro Connect existe?
          </h2>
          
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Milhares de empresas no Brasil têm produtos incríveis, mas não conseguem crescer por falta de <span className="text-primary font-semibold">estratégia digital</span>, <span className="text-primary font-semibold">posicionamento</span> e <span className="text-primary font-semibold">previsibilidade</span>.
            </p>
            <p className="text-xl font-semibold text-foreground">
              A Pro Connect existe para mudar esse jogo.
            </p>
            <p>
              Combinamos <span className="text-accent font-semibold">inteligência estratégica</span>, <span className="text-accent font-semibold">criatividade</span> e <span className="text-accent font-semibold">dados</span> para transformar marketing em crescimento real e sustentável.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-card border border-border rounded-2xl p-8 text-center space-y-3">
              <Users className="w-12 h-12 text-primary mx-auto" />
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-muted-foreground">Projetos Entregues</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-card border border-border rounded-2xl p-8 text-center space-y-3">
              <TrendingUp className="w-12 h-12 text-primary mx-auto" />
              <div className="text-4xl font-bold text-primary">5+</div>
              <div className="text-muted-foreground">Anos de Experiência</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-card border border-border rounded-2xl p-8 text-center space-y-3">
              <Lightbulb className="w-12 h-12 text-primary mx-auto" />
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Focados em Resultados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
