import { Camera, Wifi, Monitor, Mic } from "lucide-react";
import equipmentShowcase from "@/assets/equipment-showcase.png";

const equipment = [
  { name: "Sony FX30", category: "camera" },
  { name: "Drone Avata 2", category: "camera" },
  { name: "Drone Mini 4 Pro", category: "camera" },
  { name: "Canon RP", category: "camera" },
  { name: "Sony A6500", category: "camera" },
  { name: "2 Sony ZVE-10", category: "camera" },
  { name: "Canon T7i", category: "camera" },
  { name: "iPhone 13 Pro Max", category: "camera" },
  { name: "iPhone 15 Pro Max", category: "camera" },
  { name: "LarkM2", category: "audio" },
  { name: "Rode", category: "audio" },
  { name: "Hollyland", category: "audio" },
  { name: "TeoTeo", category: "audio" },
  { name: "Comunicadores Hollyland", category: "audio" },
  { name: "4 Microfones Rode Podcast", category: "audio" },
  { name: "7 Computadores Gamers", category: "tech" },
  { name: "4 Gimbals", category: "tech" },
  { name: "Starlink", category: "tech" },
];

const categoryIcons = {
  camera: Camera,
  audio: Mic,
  tech: Monitor,
};

export const Equipment = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Infraestrutura</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Estrutura Operacional e Equipamentos
          </h2>
          <p className="text-xl text-muted-foreground">
            Por trás das estratégias, existe uma operação robusta pronta para qualquer demanda.
          </p>
        </div>

        {/* Showcase Image */}
        <div className="max-w-6xl mx-auto mb-12 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={equipmentShowcase} 
              alt="Estrutura Operacional ProConnect - Drones, Câmeras e Estúdio"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Equipment grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {equipment.map((item, index) => {
            const Icon = categoryIcons[item.category as keyof typeof categoryIcons];
            return (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg font-semibold text-primary">
            Nossa estrutura garante qualidade, criatividade e velocidade — em qualquer projeto.
          </p>
        </div>
      </div>
    </section>
  );
};
