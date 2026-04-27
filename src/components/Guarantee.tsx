import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  ["O que a ProConnect faz exatamente?", "Estruturamos estratégia, conteúdo, tráfego e processos comerciais para marcas que querem crescer com previsibilidade."],
  ["Como funciona o início do trabalho?", "Começamos com diagnóstico, leitura de cenário e definição das prioridades para montar a estrutura certa para o momento da empresa."],
  ["Em quanto tempo vejo resultados?", "Depende do ponto de partida, mas o foco é criar consistência e indicadores claros desde os primeiros ciclos."],
  ["Vocês atendem qualquer tipo de negócio?", "Atendemos negócios que já validaram produto ou serviço e precisam organizar marketing e crescimento."],
  ["A ProConnect cuida das redes sociais?", "Sim, quando isso faz parte da estratégia. O conteúdo é tratado como ativo de posicionamento e vendas."],
];

export const Guarantee = () => {
  return (
    <section id="faq" className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <h2 className="text-center font-display text-4xl font-black text-foreground md:text-5xl">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-10 border-t border-border">
          {faqs.map(([question, answer]) => (
            <AccordionItem key={question} value={question} className="border-border">
              <AccordionTrigger className="font-display text-lg font-extrabold uppercase text-foreground hover:text-primary hover:no-underline">{question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
