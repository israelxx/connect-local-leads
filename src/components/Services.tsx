import {
  Target,
  Workflow,
  Palette,
  Share2,
  Video,
  Users,
  FileText,
  FolderKanban,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Target,
    title: "Gestão de Tráfego Pago",
    description: "Campanhas otimizadas que convertem visitantes em clientes reais, maximizando seu ROI.",
  },
  {
    icon: Workflow,
    title: "Automações e Funis Inteligentes",
    description: "Processos automatizados que nutrem leads e transformam oportunidades em vendas.",
  },
  {
    icon: Palette,
    title: "Design e Branding",
    description: "Identidade visual que transmite profissionalismo e conecta com seu público-alvo.",
  },
  {
    icon: Share2,
    title: "Social Media Estratégico",
    description: "Presença digital que engaja, fortalece sua marca e gera autoridade no mercado.",
  },
  {
    icon: Video,
    title: "Edição de Vídeo Profissional",
    description: "Conteúdo visual de alta qualidade que captura atenção e comunica sua mensagem.",
  },
  {
    icon: Users,
    title: "Alinhamento Comercial",
    description: "Integração entre marketing e vendas para maximizar conversões e resultados.",
  },
  {
    icon: FileText,
    title: "Estratégias e Roteiros Personalizados",
    description: "Planejamento sob medida para atingir seus objetivos de negócio com precisão.",
  },
  {
    icon: FolderKanban,
    title: "Gestão de Projetos",
    description: "Acompanhamento completo garantindo entregas no prazo e resultados mensuráveis.",
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground">
            Soluções completas e integradas para transformar seu negócio digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
