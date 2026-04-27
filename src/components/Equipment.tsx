import { BarChart3, Layers3, PenTool, RadioTower } from "lucide-react";

const services = [
  { icon: Layers3, title: "Soluções comerciais", text: "Estratégia para gerar demanda, organizar ofertas e acelerar oportunidades." },
  { icon: PenTool, title: "Produção de conteúdo", text: "Captação, direção criativa e edição com consistência de marca." },
  { icon: RadioTower, title: "Tráfego pago inteligente", text: "Campanhas com análise, otimização e foco em aquisição qualificada." },
  { icon: BarChart3, title: "Gestão de crescimento", text: "Indicadores, rotina e decisões para escalar sem depender de achismo." },
];

export const Equipment = () => {
  return (
    <section id="servicos" className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="mx-auto max-w-4xl text-center font-display text-4xl font-black leading-tight text-foreground md:text-5xl">
          A ProConnect estrutura o marketing do seu negócio com base na sua necessidade
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-primary/10">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold text-primary">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
