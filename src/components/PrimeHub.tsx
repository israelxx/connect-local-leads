import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PrimeHubProps {
  onOpenForm: () => void;
}

const plans = [
  { title: "Produção", items: ["Captação de conteúdo mensal", "Roteiro e direção", "Edição com padrão de marca", "Peças para redes sociais"] },
  { title: "Scale", featured: true, items: ["Tráfego pago + automações", "Estratégia", "Treinamento de scripts", "Funil de vendas completo"] },
  { title: "Prime Hub", items: ["Tudo do Scale", "Consultoria estratégica", "Rotina de acompanhamento", "Direção de crescimento"] },
];

export const PrimeHub = ({ onOpenForm }: PrimeHubProps) => {
  return (
    <section id="planos" className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center font-display text-4xl font-black text-foreground md:text-5xl">Estrutura que gera resultado</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.title} className={`border bg-card p-7 ${plan.featured ? "border-primary" : "border-border"}`}>
              {plan.featured && <div className="mb-4 inline-block bg-primary px-3 py-1 text-[10px] font-black uppercase text-primary-foreground">Mais procurado</div>}
              <h3 className="font-display text-3xl font-black text-foreground">{plan.title}</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {plan.items.map((item) => <li key={item}>— {item}</li>)}
              </ul>
              <Button onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })} variant={plan.featured ? "default" : "outline"} className="mt-8 w-full rounded-none font-bold uppercase">
                Falar com especialista
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
