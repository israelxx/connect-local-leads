import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenForm?: () => void;
}

export const Hero = (_props: HeroProps) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-background pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.12),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        {/* Ticker */}
        <div className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span>+15 clientes ativos</span>
          <span>+R$500k em vendas geradas</span>
          <span>Estratégia · Conteúdo · Tráfego</span>
        </div>

        <div className="mx-auto max-w-5xl text-center animate-fade-in-up">
          <h1 className="font-display text-5xl font-black leading-[0.88] text-foreground sm:text-7xl lg:text-8xl">
            <span className="block">
              Sua empresa tem <span className="text-primary">potencial.</span>
            </span>
            <span className="block">
              Sua marca <em className="not-italic text-primary">não está</em> crescendo
            </span>
            <span className="block">como deveria.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
            A ProConnect estrutura o crescimento de marcas que já validaram seu produto — mas travaram para escalar.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#formulario"
              onClick={(e) => handleAnchorClick(e, "formulario")}
              className="inline-flex h-12 items-center justify-center rounded-none bg-primary px-8 text-xs font-extrabold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Quero crescer agora <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#resultados"
              onClick={(e) => handleAnchorClick(e, "resultados")}
              className="inline-flex h-12 items-center justify-center rounded-none border border-primary/60 bg-transparent px-8 text-xs font-extrabold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
            >
              Ver resultados
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
