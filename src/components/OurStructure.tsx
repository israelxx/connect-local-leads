import structure1 from "@/assets/structure-1.jpg";
import structure2 from "@/assets/structure-2.jpg";
import structure3 from "@/assets/structure-3.jpg";
import structure4 from "@/assets/structure-4.jpg";
import structure5 from "@/assets/structure-5.jpg";
import structure6 from "@/assets/structure-6.jpg";
import structure7 from "@/assets/structure-7.jpg";

export const OurStructure = () => {
  const images = [
    { src: structure1, alt: "Estrutura Pro Connect - Ambiente 1" },
    { src: structure2, alt: "Estrutura Pro Connect - Ambiente 2" },
    { src: structure3, alt: "Estrutura Pro Connect - Ambiente 3" },
    { src: structure4, alt: "Estrutura Pro Connect - Ambiente 4" },
    { src: structure5, alt: "Estrutura Pro Connect - Ambiente 5" },
    { src: structure6, alt: "Estrutura Pro Connect - Ambiente 6" },
    { src: structure7, alt: "Estrutura Pro Connect - Ambiente 7" },
  ];

  return (
    <section id="estrutura" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nossa Estrutura
          </h2>
          <p className="text-xl text-muted-foreground">
            Conheça o ambiente preparado para transformar suas ideias em resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in aspect-[4/3]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
