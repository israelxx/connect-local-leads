const pillars = [
  ["01", "Estratégia", "Clareza de posicionamento, oferta, funil e prioridades."],
  ["02", "Criatividade", "Narrativa, campanhas e conteúdo que tornam a marca memorável."],
  ["03", "Conteúdo", "Rotina editorial com intenção comercial e autoridade."],
  ["04", "Tráfego", "Aquisição com dados, otimização e leitura de performance."],
  ["05", "Vendas", "Processos para transformar atenção em oportunidade real."],
];

export const Pillars = () => {
  return (
    <section id="pilares" className="bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center font-display text-4xl font-black text-primary md:text-5xl">Os 5 pilares ProConnect</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(([number, title, text]) => (
            <article key={number} className="min-h-48 border border-border bg-card p-6 transition-colors hover:border-primary">
              <span className="font-display text-2xl font-black text-primary/70">{number}</span>
              <h3 className="mt-8 font-display text-xl font-extrabold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
