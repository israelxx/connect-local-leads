import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const results = [
  { name: "Paiva Banger", metric: "ROAS 41,57", text: "ROI positivo para operação local com verba otimizada." },
  { name: "Trabalhar", metric: "740 conversas geradas", text: "Captação e qualificação para vendas no digital." },
];

export const Cases = () => {
  return (
    <section id="resultados" className="bg-primary py-20 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center font-display text-4xl font-black md:text-5xl">Resultados dos nossos clientes</h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
          {results.map((item) => (
            <article key={item.name} className="bg-background p-7 text-foreground">
              <p className="text-sm font-bold text-primary">{item.name}</p>
              <h3 className="mt-2 font-display text-3xl font-black">{item.metric}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-normal">Dados reais extraídos de campanhas acompanhadas pelo nosso time.</p>
          <Button onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })} variant="outline" className="rounded-none border-background bg-transparent text-background hover:bg-background hover:text-foreground">
            Ver meu caso <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
