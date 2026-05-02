import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenForm: () => void;
}

const scrollToForm = () => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });

export const Hero = ({ onOpenForm }: HeroProps) => {
  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden bg-background pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.12),transparent_34%)]" />
      <div className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center animate-fade-in-up">
          <h1 className="font-display text-5xl font-black leading-[0.88] text-foreground sm:text-7xl lg:text-8xl">
            Sua empresa tem <span className="text-primary">potencial.</span>
            <span className="block">Sua marca <em className="text-primary not-italic">não está</em></span>
            <span className="block">crescendo como deveria.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
            A ProConnect estrutura o crescimento de marcas que já validaram seu produto — mas travaram para escalar.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={scrollToForm} size="lg" className="h-12 rounded-none bg-primary px-8 text-xs font-extrabold uppercase text-primary-foreground hover:bg-primary/90">
              Quero crescer agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={scrollToForm} size="lg" variant="outline" className="h-12 rounded-none border-primary/60 bg-transparent px-8 text-xs font-extrabold uppercase text-primary hover:bg-primary/10">
              Ver resultados
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase text-muted-foreground">
            <span>+15 clientes ativos</span>
            <span>+R$500k em vendas geradas</span>
            <span>Estratégia · Conteúdo · Tráfego</span>
          </div>
        </div>
      </div>
    </section>
  );
};
