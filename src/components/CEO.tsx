import ceoPhoto from "@/assets/ceo-photo.png";
import { User } from "lucide-react";

export const CEO = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Liderança</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-30"></div>
                <div className="relative">
                  <img
                    src={ceoPhoto}
                    alt="Fellipe de Sá - CEO Pro Connect"
                    className="relative rounded-2xl shadow-2xl w-full border border-border"
                  />
                  {/* Name badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6 rounded-b-2xl">
                    <h3 className="text-2xl font-bold text-foreground">Fellipe de Sá</h3>
                    <p className="text-primary font-semibold">CEO & Marketing – Pro Connect</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Fellipe de Sá
              </h2>
              <p className="text-xl text-primary font-bold">CEO & Marketing</p>

              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fellipe de Sá é estrategista digital, gestor de tráfego, especialista em automações e fundador da Pro Connect.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Lidera a agência com visão analítica, foco em performance e crescimento previsível para negócios locais.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">10+</div>
                  <div className="text-sm text-muted-foreground mt-1">Anos de expertise</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">500+</div>
                  <div className="text-sm text-muted-foreground mt-1">Projetos entregues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
