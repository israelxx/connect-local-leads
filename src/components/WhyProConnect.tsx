const painPoints = [
  {
    title: "Comunicação inconsistente",
    text: "A empresa tem qualidade, mas aparece sem clareza e sem uma narrativa forte.",
  },
  {
    title: "Redes que oscilam",
    text: "Conteúdo sem intenção, sem rotina e sem conexão direta com vendas.",
  },
  {
    title: "Time sem direção",
    text: "Investimento em ações soltas, sem processo, métrica ou continuidade.",
  },
];

export const WhyProConnect = () => {
  return (
    <section id="dor" className="bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-5xl">
          <h2 className="font-display text-4xl font-black leading-none text-primary md:text-5xl">
            A marca cresce, mas continua dependente do dono.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {painPoints.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="font-display text-lg font-extrabold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl">
          <p className="font-display text-2xl font-extrabold leading-tight text-primary md:text-3xl">
            “O resultado? Campanhas sem retorno, leads frios e uma marca que fala mas não conecta.”
          </p>
        </div>
      </div>
    </section>
  );
};
