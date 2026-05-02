import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactProps {
  onOpenForm: () => void;
}

export const Contact = ({ onOpenForm }: ContactProps) => {
  return (
    <section id="formulario" className="bg-primary py-16 text-primary-foreground md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <h2 className="font-display text-4xl font-black italic leading-none md:text-6xl">
          Não saia sem falar com a gente. Faltam poucos minutos para sua empresa mudar.
        </h2>
        <div className="bg-primary-foreground/10 p-7 text-center backdrop-blur-sm">
          <p className="font-display text-xl font-extrabold uppercase text-primary-foreground">
            Agende seu diagnóstico agora mesmo via WhatsApp.
          </p>
          <Button onClick={onOpenForm} size="lg" className="mt-6 w-full rounded-none bg-background font-extrabold uppercase text-foreground hover:bg-background/90">
            Quero meu diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-4 text-[10px] font-bold uppercase opacity-80">Vagas limitadas para novos clientes</p>
        </div>
      </div>
    </section>
  );
};