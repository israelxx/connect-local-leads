import ceoPhoto from "@/assets/ceo-photo.png";
import { Quote } from "lucide-react";

export const CEO = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-2xl opacity-30"></div>
                <img
                  src={ceoPhoto}
                  alt="CEO Pro Connect"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="text-sm font-medium text-primary">Liderança</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Fellipe de Sá
              </h2>
              <p className="text-xl text-muted-foreground font-medium">CEO & Fundador</p>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-12 h-12 text-primary/20" />
                <p className="text-lg text-muted-foreground leading-relaxed pl-8">
                  À frente da Pro Connect está um estrategista digital com ampla experiência em gestão de tráfego, automações e performance. Com visão analítica e foco em resultados, lidera uma equipe que transforma marketing em crescimento real.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Anos de expertise</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projetos entregues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
